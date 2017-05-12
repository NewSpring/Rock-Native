const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const OfflinePlugin = require("offline-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const sharedConfig = require("./webpack.base");

module.exports = env => {
  const isDevBuild = !(env && env.prod);
  const client = [path.join(__dirname, "..", "./index.browser.js")];
  if (isDevBuild) {
    client.unshift("webpack/hot/only-dev-server");
    client.unshift("webpack-dev-server/client?http://localhost:8080");
    client.unshift("react-hot-loader/babel");
  }

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = "./dist/client";
  const clientBundleConfig = merge(sharedConfig(isDevBuild), {
    entry: { client },
    resolve: { extensions: [".browser.js", ".web.js", ".js"] },
    module: {
      rules: [
        // { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
        // { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ],
    },
    output: {
      path: path.join(__dirname, clientBundleOutputDir),
      filename: isDevBuild ? "[name].js" : "[name]-[hash].js",
      chunkFilename: "[id]-[hash].js",
      publicPath: "http://localhost:8080/dist/client",
    },
    devServer: {
      // clientLogLevel: "none",
      stats: "errors-only",
      compress: true,
      publicPath: "http://localhost:8080/dist/client",
      hot: true,
      quiet: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: isDevBuild
            ? JSON.stringify("development")
            : JSON.stringify("production"),
          __DEV__: !isDevBuild,
          BUILD: JSON.stringify(require("../package.json").version),
        },
      }),
      new webpack.ContextReplacementPlugin(
        /(blocks|layouts)/,
        /^\.\/.[a-zA-Z]+\/index\.js$/,
        false
      ),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(path.join(
          __dirname,
          clientBundleOutputDir,
          "vendor-manifest.json"
        )),
      }),
      new WebpackAssetsManifest({
        output: "../manifests/client.json",
        publicPath: isDevBuild
          ? "//localhost:8080/dist/client/"
          : process.env.CDN_URL,
      }),
    ].concat(
      isDevBuild
        ? [
            new webpack.HotModuleReplacementPlugin(),
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
              // filename: "[file].map", // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(
                clientBundleOutputDir,
                "[resourcePath]"
              ), // Point sourcemap entries to the original file locations on disk
            }),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
          ]
        : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new BundleAnalyzerPlugin({
              analyzerMode: "disabled",
              generateStatsFile: true,
              statsFilename: path.join(
                __dirname,
                "dist",
                "stats",
                "client.json"
              ),
              logLevel: "silent",
            }),
            new OfflinePlugin(),
          ]
    ),
  });

  return clientBundleConfig;
};
