// @flow

import ua from "universal-analytics";

// const UA_CODE = "UA-7130289-27";
const UA_CODE = process.env.UA_CODE;
const UA_APP = process.env.APP_NAME || "RockNative";
const uaVisitor = UA_CODE ? ua(UA_CODE) : null;

export const trackScreenView = (screen: string): void =>
  uaVisitor ? uaVisitor.screenview(screen, UA_APP).send() : undefined;

export const trackPageView = (page: string): void =>
  uaVisitor ? uaVisitor.pageview(page, UA_APP).send() : undefined;

export const trackEvent = (
  category: string,
  action?: ?string,
  label?: ?string,
  value?: ?string,
) => (uaVisitor ? uaVisitor.event(category, action, label, value) : undefined);

export type TransactionItem = {
  totalPrice: number,
  quantity: number,
  sku: string,
  name: string,
  variation: string,
};

export const trackTransaction = (
  transactionId: string,
  total: number,
  items: [TransactionItem],
) => {
  if (!uaVisitor) return;
  const transaction = uaVisitor.transaction(transactionId, total);
  if (items && items.length) {
    items.map(({ totalPrice, quantity, sku, name, variation }) => {
      transaction.item(totalPrice, quantity, sku, name, variation);
    });
  }
  transaction.send();
};
