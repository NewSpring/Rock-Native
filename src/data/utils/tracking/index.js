// @flow

import {
  trackScreenView,
  trackPageView,
  trackEvent,
  trackTransaction,
} from "./ua";
import type { TransactionItem } from "./ua";

type ILogType = "ERROR" | "EVENT" | "PAGEVIEW" | "SCREENVIEW" | "TRANSACTION";

type IData = {
  type: ILogType,
  payload: {
    title?: ?string,
    message?: ?string,
    stack?: ?string,
    label?: ?string,
    value?: ?string,
    total?: ?number,
    transactionItems?: ?[TransactionItem],
    [key: string]: mixed,
  },
};

/*
  ERROR: Unimplemented
  EVENT:
    payload: {
      title, // event category
      ?message, // action
      ?label, // label
      ?value // value
    }
  PAGEVIEW/SCREENVIEW:
    payload: {
      !title // page/screen name
    }
  TRANSACTION:
    payload: {
      !title, // transactionId
      !total,
      ?transactionItems //itemized list
    }
*/

export default ({ type, payload }: IData) => {
  switch (type) {
    case "ERROR": {
      // add in sentry here
      break;
    }
    case "EVENT": {
      if (payload && payload.title) {
        const { title, message, label, value } = payload;
        trackEvent(title, message, label, value); // (category, ?action, ?label, ?value)
      }
      break;
    }
    case "PAGEVIEW": {
      if (payload.title) trackPageView(payload.title);
      break;
    }
    case "SCREENVIEW": {
      if (payload.title) trackScreenView(payload.title);
      break;
    }
    case "TRANSACTION": {
      const { title, total, transactionItems } = payload;
      if (title && total && transactionItems) {
        trackTransaction(title, total, transactionItems); //value: total
      }
      break;
    }
    default: {
      break;
    }
  }
};
