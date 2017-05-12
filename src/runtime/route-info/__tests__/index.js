import routeInfo, { LOCATION_QUERY, options, props } from "../";

describe("Location Query", () => {
  it("exists", () => {
    expect(LOCATION_QUERY).toMatchSnapshot();
  });
});

describe("options reducer", () => {
  it("returns an object with correct data shape", () => {
    const result = options({ location: { pathname: "boi" } });
    expect(result.variables).toBeDefined();
    expect(result.variables.path).toBeDefined();
    expect(result).toEqual({
      variables: {
        path: "boi",
      },
    });
  });

  it("formats path to null if no location passed in", () => {
    const result = options();
    expect(result.variables.path).toEqual(null);
  });
});

describe("props reducer", () => {
  it("returns loading state if no data passed in", () => {
    expect(props()).toEqual({ loading: true });
  });

  it("returns loading state if data but no route data", () => {
    expect(
      props({
        data: "hey",
      }),
    ).toEqual({ loading: true });
  });

  it("returns registry prop if route data present", () => {
    expect(
      props({
        data: { getRouteInfo: "yo" },
      }),
    ).toEqual({ registry: "yo" });
  });
});

describe("routeInfo", () => {
  it("returns a function that makes an apollo hoc", () => {
    expect(typeof routeInfo).toEqual("function");
    expect(routeInfo(() => null).displayName).toEqual("Apollo(Component)");
  });
});
