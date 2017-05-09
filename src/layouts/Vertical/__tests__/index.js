import { layoutStyle } from "../";

describe("Layout Style", () => {
  it("should resolve to object and match styles", () => {
    expect(typeof layoutStyle.resolve()).toBe("object");
    expect(layoutStyle.resolve()).toEqual({
      flexDirection: "column",
      alignItems: "center",
      height: "50%",
    });
  });
});
