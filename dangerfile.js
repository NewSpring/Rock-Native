// Removed import
import { danger, fail, warn } from "danger";
import fs from "fs";

// Make sure there are changelog entries
// const hasChangelog = danger.git.modified_files.includes("changelog.md")
// if (!hasChangelog) { fail("No Changelog changes!") }
//
const jsFiles = danger.git.created_files.filter(path => path.endsWith("js"))

// new js files should have `@flow` at the top
const unFlowedFiles = jsFiles.filter(filepath => {
  const content = fs.readFileSync(filepath)
  return !content.includes("@flow")
})

if (unFlowedFiles.length > 0) {
  warn(`These new JS files do not have Flow enabled: ${unFlowedFiles.join(", ")}`)
}
