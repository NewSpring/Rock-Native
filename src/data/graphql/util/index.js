// @flow

export const platform = () => "web";
export const bundleId = () =>
  window && window.location && window.location.hostname
    ? window.location.hostname
    : "";
export const version = () =>
  process && process.env && process.env.BUILD ? process.env.BUILD : "";
