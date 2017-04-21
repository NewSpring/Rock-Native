const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  const sharedConfig = {
    stats: { modules: false },
    resolve: { extensions: [".js"] },
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
          use: "url-loader?limit=100000",
        },
      ],
    },
    entry: {
      vendor: [
        "domain-task",
        "event-source-polyfill",
        "react",
        "react-dom",
        "react-router",
      ],
    },
    output: {
      publicPath: "/dist/",
      filename: "[name].js",
      library: "[name]_[hash]",
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": isDevBuild ? '"development"' : '"production"',
      }),
    ],
  };

  const clientBundleConfig = merge(sharedConfig, {
    output: { path: path.join(__dirname, "wwwroot", "dist") },
    module: {
      rules: [],
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
        name: "[name]_[hash]",
      }),
    ].concat(isDevBuild ? [] : [new webpack.optimize.UglifyJsPlugin()]),
  });

  const serverBundleConfig = merge(sharedConfig, {
    target: "node",
    resolve: { mainFields: ["main"] },
    output: {
      path: path.join(__dirname, "wwwroot", "app", "dist"),
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [],
    },
    entry: { vendor: ["aspnet-prerendering", "react-dom/server"] },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(
          __dirname,
          "wwwroot",
          "app",
          "dist",
          "[name]-manifest.json",
        ),
        name: "[name]_[hash]",
      }),
    ],
  });

  return [clientBundleConfig, serverBundleConfig];
};
