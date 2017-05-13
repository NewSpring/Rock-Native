import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { defaultProps } from "recompose";
import Comps, {
  layoutStyle,
  loadingState,
  loadingCheck,
  Loading,
  groupObject,
  zoneFromBlock,
  mapValues,
  blocksToZones,
} from "../index.js";

const registry = {
  layout: "Vertical",
  blocks: [
    { id: 1, path: "HelloWorld", zone: 0, order: 0 },
    { id: 2, path: "Counter", zone: 0, order: 1 },
  ],
};
const props = defaultProps({ registry });
const generateComponent = additionalProps => (
  <Comps {...props} {...additionalProps} />
);

describe("layoutStyle", () => {
  it("should be a flex container", () => {
    expect(layoutStyle.resolve()).toEqual({ flex: 1 });
  });
});

describe("App entry point", () => {
  // XXX figure out how to test this with react-router
  it("should render the components", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe("loadingCheck", () => {
  it("should be false if not explicitly said to be loading", () => {
    expect(loadingCheck({})).toEqual(false);
  });
  it("should be true if loading key is true", () => {
    expect(loadingCheck({ loading: true })).toEqual(true);
  });
});

describe("Loading", () => {
  // XXX UPDATE WHEN WE HAVE A REAL ONE
  it("should render loading state (null)", () => {
    const component = shallow(<Loading />);
    expect(component.html()).toEqual(null);
  });
});

describe("loadingState", () => {
  it("is a recompose hoc", () => {
    const state = loadingState(() => () => null);
    expect(typeof state).toEqual("function");
    expect(state.displayName).toEqual("branch(Component)");
  });
  it("does not render if loading is true", done => {
    let executed = false;
    const Test = loadingState(() => {
      executed = true;
      return null;
    });

    shallow(<Test loading={true} />);
    setTimeout(() => {
      expect(executed).toEqual(false);
      done();
    }, 25);
  });
});

describe("groupObject", () => {
  it("converts an array of objects into a grouped object", () => {
    const source = [
      { id: "one", value: 1 },
      { id: "one", value: 2 },
      { id: "two", value: 1 },
    ];

    const expected = {
      one: [{ id: "one", value: 1 }, { id: "one", value: 2 }],
      two: [{ id: "two", value: 1 }],
    };

    expect(groupObject(x => x.id, source)).toEqual(expected);
  });
  it("can be curried", () => {
    const source = [
      { id: "one", value: 1 },
      { id: "one", value: 2 },
      { id: "two", value: 1 },
    ];

    const expected = {
      one: [{ id: "one", value: 1 }, { id: "one", value: 2 }],
      two: [{ id: "two", value: 1 }],
    };

    const byId = groupObject(x => x.id);
    expect(byId(source)).toEqual(expected);
  });
});

describe("zoneFromBlock", () => {
  it("returns the zone key from an object", () => {
    expect(zoneFromBlock({ zone: "1" })).toEqual("1");
  });
});

describe("mapValues", () => {
  it("allows for mapping over the values of an object", () => {
    const source = {
      foo: "bar",
      bar: "foo",
    };
    expect(mapValues(x => x.toUpperCase(), source)).toEqual({
      foo: "BAR",
      bar: "FOO",
    });
  });
  it("can be curried", () => {
    const source = {
      foo: "bar",
      bar: "foo",
    };
    const upperCase = mapValues(x => x.toUpperCase());
    expect(upperCase(source)).toEqual({
      foo: "BAR",
      bar: "FOO",
    });
  });
});

describe("blocksToZones", () => {
  it("reshapes and sorts a Layout and component shape", () => {
    const source = {
      Layout: () => null,
      components: [
        { id: 1, path: "HelloWorld", order: 0, zone: "main" },
        { id: 2, path: "HaiWorld", order: 2, zone: "main" },
        { id: 3, path: "HeyWorld", order: 1, zone: "main" },
        { id: 4, path: "YoWorld", order: 1, zone: "secondary" },
        { id: 5, path: "SupWorld", order: 0, zone: "secondary" },
      ],
    };

    const expected = {
      Layout: source.Layout,
      zones: {
        main: [
          { id: 1, path: "HelloWorld", order: 0, zone: "main" },
          { id: 3, path: "HeyWorld", order: 1, zone: "main" },
          { id: 2, path: "HaiWorld", order: 2, zone: "main" },
        ],
        secondary: [
          { id: 5, path: "SupWorld", order: 0, zone: "secondary" },
          { id: 4, path: "YoWorld", order: 1, zone: "secondary" },
        ],
      },
    };

    const Test = blocksToZones(props => {
      expect(props).toEqual(expected);
      return null;
    });

    shallow(<Test {...source} />);
  });
});
