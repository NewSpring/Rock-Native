import Style from "@jongold/further";
import { Button } from "react-native";
import { mapProps } from "recompose";
// import idx from "idx";

// import Defaults from "../defaults";

// nullables

export const buttonStyles = Style(props => ({
  ...props.style, // refactor to use Style()
}));

export const helpers = { buttonStyles };

const BasicButton = mapProps(x => ({
  accessibilityLabel: x.title,
  ...x,
  style: buttonStyles.resolve(x),
}))(Button);

export default BasicButton;
