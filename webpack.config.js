const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/views/Browser.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "app.[hash].js"
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
    new NodemonPlugin({
      watch: path.resolve("./"),
      ignore: ["node_modules/*", "dist/*"],
      script: "./index.js",
      ext: "js,html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./src/views/index.html" })
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
};
