// @flow
import ua from "universal-analytics";

const UA_CODE = "UA-7130289-27";
const UA_APP = "RockNative";
const uaVisitor = ua(UA_CODE);

const trackScreenView = (screen: string): void =>
  uaVisitor.screenview(screen, UA_APP).send();

const trackPageView = (screen: string): void =>
  uaVisitor.pageview(screen, UA_APP).send();
