// @flow
// Removed import
import { danger, fail, warn } from "danger";
import { any, compose } from "ramda";
import { sync as gzip } from "gzip-size";
import fs, { readFileSync } from "fs";

// Takes a list of file paths, and converts it into clickable links
const linkableFiles = paths => {
  const repoURL = danger.github.pr.head.repo.html_url;
  const ref = danger.github.pr.head.ref;
  const links = paths.map(path => {
    return createLink(`${repoURL}/blob/${ref}/${path}`, path);
  });
  return toSentence(links);
};

// ["1", "2", "3"] to "1, 2 and 3"
const toSentence = (array: Array<string>): string => {
  if (array.length === 1) {
    return array[0];
  }
  return array.slice(0, array.length - 1).join(", ") + " and " + array.pop();
};

// ("/href/thing", "name") to "<a href="/href/thing">name</a>"
const createLink = (href: string, text: string): string =>
  `<a href='${href}'>${text}</a>`;

// Raise about missing code inside files
const raiseIssueAboutPaths = (
  type: Function,
  paths: string[],
  codeToInclude: string,
) => {
  if (paths.length > 0) {
    const files = linkableFiles(paths);
    const strict = "<code>" + codeToInclude + "</code>";
    type(`Please ensure that ${strict} is enabled on: ${files}`);
  }
};

// make sure someone else reviews these changes
const someoneAssigned = danger.github.pr.assignee;
if (someoneAssigned === null) {
  warn(
    "Please assign someone to merge this PR, and optionally include people who should review.",
  );
}

// Make sure there are changelog entries
const hasChangelog =
  danger.git.modified_files.includes("changelog.md") ||
  danger.git.created_files.includes("changelog.md");
if (!hasChangelog) {
  warn("No Changelog changes!");
}

// only look in the /src/ folder
const jsModifiedFiles = danger.git.created_files
  .filter(path => any(x => x.includes("src/"), path))
  .filter(path => path.endsWith("js"));
const hasAppChanges = jsModifiedFiles.length > 0;

const jsTestChanges = jsModifiedFiles.filter(filepath =>
  filepath.includes("__tests__"),
);
const hasTestChanges = jsTestChanges.length > 0;

// Warn when there is a big PR
const bigPRThreshold = 500;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(":exclamation: Big PR");
}

// XXX add in License header
// https://github.com/facebook/jest/blob/master/dangerfile.js#L58

// Warn if there are library changes, but not tests
if (hasAppChanges && !hasTestChanges) {
  warn(
    "There are library changes, but not tests. That's OK as long as you're refactoring existing code",
  );
}

// new js files should have `@flow` at the top
const unFlowedFiles = jsModifiedFiles.filter(filepath => {
  // don't required flow for tests
  if (filepath.match(/__tests__\/$/gim)) return true;
  const content = fs.readFileSync(filepath);
  return !content.includes("@flow");
});

raiseIssueAboutPaths(warn, unFlowedFiles, "@flow");

// Be careful of leaving testing shortcuts in the codebase
const onlyTestFiles = jsTestChanges.filter(x => {
  const content = fs.readFileSync(x).toString();
  return content.includes("it.only") || content.includes("describe.only");
});
raiseIssueAboutPaths(fail, onlyTestFiles, "an `only` was left in the test");

// Politely ask for their name on the entry too
// if (hasChangelog) {
//   const changelogDiff = danger.git.diffForFile("changelog.md");
//   const contributorName = danger.github.pr.user.login;
//   if (changelogDiff && changelogDiff.indexOf(contributorName) === -1) {
//     warn(
//       'Please add your GitHub name ("' +
//         contributorName +
//         '") to the changelog entry.',
//     );
//   }
// }

// Warns if there are changes to package.json without changes to yarn.lock.
const packageChanged = any(
  x => x.includes("package.json"),
  danger.git.modified_files,
);
const lockfileChanged = any(
  x => x.includes("yarn.lock"),
  danger.git.modified_files,
);
if (packageChanged && !lockfileChanged) {
  const message = "Changes were made to package.json, but not to yarn.lock";
  const idea = "Perhaps you need to run `yarn install`?";
  warn(`${message} - <i>${idea}</i>`);
}

/* CHECK BUNDLE FILESIZES */
const warnSize = 150000; // 150kb
const failSize = 200000; // 200kb
const buildDir = "./web/dist/client/";
const printRow = file =>
  `<tr>
    <td>${file.filename}</td>
    <td>${file.size / 1000}kb</td>
    <td>${file.status}</td>
  </tr>`;

const getSize = compose(gzip, readFileSync);

if (fs.existsSync(buildDir)) {
  // get bundle names
  const files = fs.readdirSync(buildDir).filter(name => name.match(/.js$/));
  const reducer = size => (over, filename) =>
    getSize(`${buildDir}${filename}`) > size
      ? over.concat({
          filename,
          size: getSize(`${buildDir}${filename}`),
        })
      : over;

  const over = files.reduce(reducer(warnSize), []); // files over the warning
  const warns = over // files over the warning but under the max
    .filter(x => x.size < failSize)
    .map(x => ({ ...x, status: `${(failSize - x.size) / 1000}kb under max` }));
  const fails = over // files over the max
    .filter(x => x.size >= failSize)
    .map(x => ({ ...x, status: `${(x.size - failSize) / 1000}kb over max` }));

  if (warns.length) {
    warn(`
      \n<table>
        <tr><th>Filename</th><th>Size</th><th>Status</th></tr>
        ${warns.map(printRow).join("")}
      </table>
    `);
  }
  if (fails.length) {
    // XXX set to warn just until we get everything in order :)
    warn(`
      \n<table>
        <tr><th>Filename</th><th>Size</th><th>Status</th></tr>
        ${fails.map(printRow).join("")}
      </table>
    `);
  }
} else {
  fail("build directory not present");
}
