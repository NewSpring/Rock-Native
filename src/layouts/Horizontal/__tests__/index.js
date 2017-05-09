import { layoutStyle } from "../";

describe("Layout Style", () => {
  it("should resolve to object and match styles", () => {
    expect(typeof layoutStyle.resolve()).toBe("object");
    expect(layoutStyle.resolve()).toEqual({
      flexDirection: "row",
      justifyContent: "center",
      height: "100%",
      marginTop: "50%",
    });
  });
});
