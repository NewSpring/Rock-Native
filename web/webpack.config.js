const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const OfflinePlugin = require('offline-plugin');


// const baseBabel = require("../.babelrc");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  // Configuration in common to both client-side and server-side bundles
  const sharedConfig = () => ({
    stats: { modules: false },
    //  performance: {
    //   hints: isDevBuild ? true : false,
    // },
    resolve: {
      extensions: [".web.js", ".js"],
    },
    output: {
      filename: "[name].js",
      publicPath: "/dist/", // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use:  "babel-loader",
        }
      ],
    },
    plugins: [
      
    ],
  });

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = "./wwwroot/dist";
  const clientBundleConfig = merge(sharedConfig(), {
    entry: { "main-client": path.join(__dirname, "..", "./index.browser.js") },
    resolve: {  extensions: [".browser.js"] },
    module: {
      rules: [
        // { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
        // { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ],
    },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(
          path.join(__dirname, clientBundleOutputDir, "vendor-manifest.json")
        )
      }),
    ].concat(
      isDevBuild
        ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map", // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(
                clientBundleOutputDir,
                "[resourcePath]"
              ), // Point sourcemap entries to the original file locations on disk
            }),
          ]
        : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new BundleAnalyzerPlugin({
              analyzerMode: "disabled",
              generateStatsFile: true,
              statsFilename:  path.join(__dirname, "wwwroot", "dist", "stats.json"),
              logLevel: 'silent'
            }),
            new OfflinePlugin(),
          ]
    ),
  });

  // Configuration for server-side (prerendering) bundle suitable for running in Node
  const serverBundleConfig = merge(sharedConfig(), {
    resolve: { mainFields: ["main"], extensions: [".server.js"] },
    entry: { "main-server": path.join(__dirname, "..", "./index.server.js") },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(
          path.join(
            __dirname,
            clientBundleOutputDir,
            "../app",
            "dist",
            "vendor-manifest.json"
          )
        ),
        sourceType: "commonjs2",
        name: "./vendor",
      }),
    ],
    output: {
      libraryTarget: "commonjs",
      path: path.join(__dirname, clientBundleOutputDir, "../app/dist"),
    },
    target: "node",
    devtool: "inline-source-map",
  });

  return [clientBundleConfig, serverBundleConfig];
};
