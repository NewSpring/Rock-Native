// @flow
import { Link } from "react-router-dom";
import { helloStyle } from "./";

export default props => (
  <Link to="/hello"><h1 style={helloStyle.resolve()}>Hello World</h1></Link>
);
