import { evolve, multiply } from "ramda";
import Style from "@jongold/further";

/* ////////////////
///// STYLE() /////
//////////////// */

// checks if the props.style is a Style(). if so, resolves it
export const mergePropStyle = props =>
  props.style instanceof Style ? props.style.resolve(props) : props.style;

/* /////////////
///// FONT /////
///////////// */

export const setFontSize = size => evolve({ fontSize: () => size });
export const scaleFontSize = factor => evolve({ fontSize: multiply(factor) });

export const setFontWeight = weight => evolve({ fontWeight: () => weight });
export const boldWeight = evolve({ fontWeight: 700 });
export const normalWeight = evolve({ fontWeight: 400 });
export const lightWeight = evolve({ fontWeight: "lighter" });
