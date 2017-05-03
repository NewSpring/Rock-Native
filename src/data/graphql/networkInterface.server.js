// @flow
/*
 * NOTE
 * 
 * middlewares are not pure in apollo client
 * each ware mutates the request (or the result)
 * and calls next() indicating the next ware can run
 *
 * it isn't worth our time currently to refactor that to make it
 * functional (it could be a fun project though)
 *
 * apollo-client has an odd API for middleware / afterware that comes
 * from ad-hoc dev of the NetworkInterface feature set. Cleaning it up
 * could be a great PR (it would be a breaking change so backwards compat
 * would be critical)
 *
 */
import { slice } from "ramda";
import type { DocumentNode, ExecutionResult } from "graphql";
import { graphql } from "./";

// shape of request from apollo client
export type IRequest = {
  query: DocumentNode,
  variables?: { [key: string]: any },
  operationName?: string,
};

export type IApplyRequest = {
  request?: IRequest,
  response?: ExecutionResult,
};

export type IMiddlewareRequest = {|
  request: IRequest,
  context: mixed,
|};

export type IMiddleware = {
  applyMiddleware(request: IMiddlewareRequest, next: Function): void,
};

export type IAfterwareResponse = {
  response: ExecutionResult,
};

export type IAfterware = {
  applyAfterware(response: IAfterwareResponse, next: Function): void,
};

export type IWare = IMiddleware | IAfterware;
export type IPayload = IMiddlewareRequest | IAfterwareResponse;

export interface INetworkInterface {
  _opts: mixed,
  _middlewares: IMiddleware[],
  _afterwares: IAfterware[],

  use: (middlewares: IMiddleware[]) => INetworkInterface,
  useAfter: (middlewares: IAfterware[]) => INetworkInterface,

  query: (request: IRequest) => Promise<ExecutionResult>,
}

export function NetworkInterface(options: mixed = {}) {
  if (!(this instanceof NetworkInterface)) return new NetworkInterface(options);
  this._middlewares = [];
  this._afterwares = [];
  this._opts = options;
  return this;
}

export const apply = (middlewares: IWare[], payload: IPayload): Promise<> =>
  new Promise(resolve => {
    const funcs = slice(0, middlewares.length, middlewares);
    const next = () => {
      if (funcs.length > 0) {
        const f = funcs.shift();
        if (f && f.applyMiddleware && payload.request)
          f.applyMiddleware(payload, next);
        if (f && f.applyAfterware && payload.response)
          f.applyAfterware(payload, next);
      } else {
        resolve(payload);
      }
    };
    next();
  });

NetworkInterface.prototype.query = function(
  request: IRequest,
): Promise<ExecutionResult> {
  // XXX context handling
  return apply(this._middlewares, { request })
    .then(
      ({
        request: { query, variables, operationName },
        context,
      }: IMiddlewareRequest) =>
        graphql(query, {}, context, variables, operationName),
    )
    .then(response => apply(this._afterwares, { response }))
    .then(({ response }: IAfterwareResponse) => response);
};

NetworkInterface.prototype.use = function(
  middlewares: IMiddleware[],
): INetworkInterface {
  this._middlewares = this._middlewares.concat(
    middlewares.filter(
      (x: IMiddleware) => typeof x.applyMiddleware === "function",
    ),
  );
  return this;
};

NetworkInterface.prototype.useAfter = function(
  middlewares: IAfterware[],
): INetworkInterface {
  this._afterwares = this._afterwares.concat(
    middlewares.filter(
      (x: IAfterware) => typeof x.applyAfterware === "function",
    ),
  );

  return this;
};

export default (options: mixed): INetworkInterface => NetworkInterface(options);
