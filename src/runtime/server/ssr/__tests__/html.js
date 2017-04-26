import withHtml, { html } from "../html";

const metadata = {
  title: {
    toString: () => "<title>Sample</title>",
  },
  meta: {
    toString: () => "",
  },
  link: {
    toString: () => "<meta>stylesheet goes here</meta>",
  },
  htmlAttributes: {
    toString: () => "",
  },
  bodyAttributes: {
    toString: () => "",
  },
};

describe("html", () => {
  it("returns back a known shape of stringified markup", () => {
    expect(html(metadata, "foo")).toMatchSnapshot();
  });
  it("includes a body", () => {
    expect(html(metadata, "<div>hello world</div>")).toMatchSnapshot();
  });
  it("places scripts at the bottom of the body", () => {
    expect(
      html(metadata, "<div>hello world</div>", "<script></script>"),
    ).toMatchSnapshot();
  });
});

describe("withHtml", () => {
  it("converts scripts, body, and metadata into an html key", () => {
    const initial = {
      metadata,
      body: "<div>hello world</div>",
      scripts: "<script></script>",
      other: "keys",
      are: "okay",
      and: "passed",
    };

    const result = withHtml(initial);
    expect(result.html).toMatchSnapshot();
    expect(result.metadata).toBeUndefined();
    expect(result.other).toEqual("keys");
    expect(result.are).toEqual("okay");
  });
});
