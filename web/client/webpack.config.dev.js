const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [path.resolve(__dirname, '../../index.web.js')],
  output: {
    filename: '[name].blocks.bundle.js',
    chunkFilename: '[id].block.bundle.js',
    path: path.resolve(__dirname, './dist/'),
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
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dune',
      template: path.resolve(__dirname, './index.ejs'),
    }),
  ],
  devServer: {
    compress: true,
    inline: true,
    hot: false,
    port: 3000,
  },
};
