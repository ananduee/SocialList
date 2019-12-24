const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/views/Browser.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist',
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/views/index.html'})
  ]
};
