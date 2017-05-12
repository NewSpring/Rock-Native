module.exports = isDevBuild => ({
  stats: { modules: false },
  //  performance: {
  //   hints: isDevBuild ? true : false,
  // },
  output: {
    filename: "[name].js",
    publicPath: "/dist/", // Webpack dev middleware, if enabled, handles requests for this URL prefix
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|__tests__)/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [],
});
