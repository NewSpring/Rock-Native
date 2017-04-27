const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OfflinePlugin = require('offline-plugin');
const WebpackAssetsManifest = require("webpack-assets-manifest");

const sharedConfig = require("./webpack.base");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = "./dist/client";
  const clientBundleConfig = merge(sharedConfig(isDevBuild), {
    entry: { "client": path.join(__dirname, "..", "./index.browser.js") },
    resolve: {  extensions: [".browser.js"] },
    module: {
      rules: [
        // { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
        // { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ],
    },
    output: {
      path: path.join(__dirname, clientBundleOutputDir),
      filename: '[name]-[hash].js',
      chunkFilename: '[id]-[hash].js',
    },
    devServer: {
      // clientLogLevel: "none",
      stats: "errors-only",
      compress: true,
      inline: true,
      publicPath: "http://localhost:8080/dist/client",
      hot: true,
      quiet: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      }
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(
          path.join(__dirname, clientBundleOutputDir, "vendor-manifest.json")
        )
      }),
      new WebpackAssetsManifest({
        output: "../manifests/client.json",
        publicPath: isDevBuild ? "//localhost:8080/dist/client/": process.env.CDN_URL,
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
              statsFilename:  path.join(__dirname,  "dist", "stats", "client.json"),
              logLevel: 'silent'
            }),
            // new OfflinePlugin(),
          ]
    ),
  });


  return clientBundleConfig;
};
