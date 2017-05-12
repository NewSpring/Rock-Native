// @flow

/*
This component gets called/updated with every route change.
Using the route info, it makes an API call and returns a json object
with block information.
*/
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import type { IRegistryRequest } from "../registry/util/types.js";

export const LOCATION_QUERY = gql`
  query GetRouteInfo($path: String!){
    getRouteInfo(path: $path) {
      id
      blocks {
        id
        path
      }
    }
  }
`;

type IOptions = {
  location: ?{
    pathname: string,
  },
};
export const options = ({ location }: IOptions = { location: null }) => ({
  variables: { path: location ? location.pathname : null },
});

type IProps = {
  data: {
    getRouteInfo: IRegistryRequest,
  },
};
export const props = ({ data }: IProps = { data: { getRouteInfo: null } }) => {
  if (data && data.getRouteInfo) {
    return { registry: data.getRouteInfo };
  }
  return { loading: true };
};

export default graphql(LOCATION_QUERY, { options, props });
