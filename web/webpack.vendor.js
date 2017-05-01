const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  const sharedConfig = {
    stats: { modules: false },
    resolve: {
      extensions: [".js"],
    },
    module: {
      rules: [],
    },
    entry: {
      vendor: [
        "react",
        "react-dom",
        "react-router",
        "react-helmet",
        "react-apollo",
        "apollo-client",
        "graphql-tag",
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
      vendor: ["react-router-dom"],
    },
    output: {
      path: path.join(__dirname, "dist", "client"),
      filename: isDevBuild ? "[name].js" : "[name]-[hash].js",
      chunkFilename: "[id]-[hash].js",
    },
    module: {
      rules: [],
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "dist", "client", "[name]-manifest.json"),
        name: "[name]_[hash]",
      }),
      new WebpackAssetsManifest({
        output: "../manifests/vendor.json",
        publicPath: (
          isDevBuild ? "//localhost:8080/dist/client/" : process.env.CDN_URL
        ),
      }),
    ].concat(
      isDevBuild
        ? []
        : [
            new webpack.optimize.UglifyJsPlugin(),
            new BundleAnalyzerPlugin({
              analyzerMode: "disabled",
              generateStatsFile: true,
              statsFilename: path.join(
                __dirname,
                "dist",
                "stats",
                "vendor.json"
              ),
              logLevel: "silent",
            }),
          ]
    ),
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
      ],
    },
    plugins: [
      new webpack.DllPlugin({
        path: path.join(__dirname, "dist", "server", "[name]-manifest.json"),
        name: "[name]_[hash]",
      }),
    ],
  });

  return [clientBundleConfig, serverBundleConfig];
};
