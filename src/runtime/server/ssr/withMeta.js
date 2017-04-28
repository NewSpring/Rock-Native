// @flow
import Helmet from "react-helmet";
import type { Head } from "react-helmet";

type IMetaDataResult = {
  [key: any]: any,
  metadata: Head,
};

export default (x: any): IMetaDataResult => ({
  ...x,
  metadata: Helmet.renderStatic(),
});
