/*
This component gets called/updated with every route change.
Using the route info, it makes an API call and returns a json object
with block information.
*/
import Junction from "../../junction";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

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

export const options = ({ location } = { location: null }) => ({
  variables: { path: location ? location.pathname : null },
});

export const props = ({ data } = { data: null }) => {
  if (data && data.getRouteInfo) {
    return { registry: data.getRouteInfo };
  }
  return { loading: true };
};

export default graphql(LOCATION_QUERY, { options, props });
