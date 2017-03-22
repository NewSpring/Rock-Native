const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    path.resolve(__dirname, "../../index.web.js"),
  ],
  output: {
    filename: "[name].blocks.bundle.js",
    chunkFilename: "[id].block.bundle.js",
    path: path.resolve(__dirname, "./dist/"),
  },
  module: {
    rules: [
      //  {
      //    enforce: "pre",
      //    test: /\.(js)$/,
      //    loader: "eslint-loader",
      //  },
      {
        test: /\.(js)$/,
        loaders: ["react-hot-loader/webpack", "babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "RockNative",
      template: path.resolve(__dirname, "./index.ejs"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    compress: true,
    inline: true,
    hot: true,
    port: 3000,
  },
};
