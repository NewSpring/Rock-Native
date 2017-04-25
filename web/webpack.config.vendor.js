const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = env => {
  const isDevBuild = !(env && env.prod);

  const sharedConfig = {
    stats: { modules: false },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [
      ],
    },
    entry: {
      vendor:[
        "react",
        "react-dom",
        "react-router",
        "react-helmet",
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
     entry: {
      vendor: [
        "react-router-dom",
      ],
    },
    output: { path: path.join(__dirname, "dist") },
    module: {
      rules: [],
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "dist", "[name]-manifest.json"),
        name: "[name]_[hash]",
      }),
    ].concat(isDevBuild ? [] : [
      new webpack.optimize.UglifyJsPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
        generateStatsFile: true,
        statsFilename:  path.join(__dirname, "dist", "vendor-stats.json"),
        logLevel: 'silent'
      })
    ]),
  });

  const serverBundleConfig = merge(sharedConfig, {
    target: "node",
    resolve: { mainFields: ["main"] },
    output: {
      path: path.join(__dirname, "dist", "server"),
      libraryTarget: "commonjs2",
    },
    module: {
      rules: [],
    },
    entry: {
      vendor: [
        "react-dom/server",
        "graphql-server-lambda",
        "graphql",
        "graphql-tools",
      ]
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(
          __dirname,
          "dist",
          "server",
          "[name]-manifest.json"
        ),
        name: "[name]_[hash]",
      }),
    ],
  });

  return [clientBundleConfig, serverBundleConfig];
};
