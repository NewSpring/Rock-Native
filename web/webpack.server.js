const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

const sharedConfig = require("./webpack.base");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig(isDevBuild), {
    resolve: { mainFields: ["main"], extensions: [".server.js"] },
    entry: {
      server: [
        "regenerator-runtime/runtime",
        path.join(__dirname, "..", "./index.server.js"),
      ],
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/blocks/, /^index\.js/, false),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(path.join(
          __dirname,
          "dist",
          "server",
          "vendor-manifest.json"
        )),
        sourceType: "commonjs2",
        name: "./vendor",
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, "handler.js"),
          to: path.join(__dirname, "dist", "server"),
        },
        { from: path.join(__dirname, "dist", "server", "vendor.js") },
      ]),
    ].concat(
      isDevBuild
        ? [new webpack.NoEmitOnErrorsPlugin(), new webpack.NamedModulesPlugin()]
        : [
            new ZipPlugin({
              path: "./../../",
              filename: "dist.zip",
              include: [/\.js$/],
            }),
          ]
    ),
    output: {
      libraryTarget: "commonjs",
      library: "RockNative",
      path: path.join(__dirname, "dist", "server"),
    },
    target: "node",
    devtool: "inline-source-map",
  });

  return serverBundleConfig;
};
