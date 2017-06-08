// @flow

// $FlowIgnore
import ua from "universal-analytics";

const UA_CODE = "UA-7130289-27";
const UA_APP = "RockNative";
const uaVisitor = ua(UA_CODE);

const trackScreenView = (screen: string): void =>
  uaVisitor.screenview(screen, UA_APP).send();

const trackPageView = (page: string): void =>
  uaVisitor.pageview(page, UA_APP).send();

const trackEvent = (
  category: string,
  action: string,
  label: string,
  value: string,
) => uaVisitor.event(category, action, label, value);

type TransactionItem = {
  totalPrice: number,
  quantity: number,
  sku: string,
  name: string,
  variation: string,
};

const trackTransaction = (
  transactionId: string,
  total: number,
  items: [TransactionItem],
) => {
  const transaction = uaVisitor.transaction(transactionId, total);
  if (items && items.length) {
    items.map(({ totalPrice, quantity, sku, name, variation }) => {
      transaction.item(totalPrice, quantity, sku, name, variation);
    });
  }
  transaction.send();
};
