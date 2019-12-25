const path = require("path");
const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV == "development";

const webpackConfig = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    app: "./src/views/Browser.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "[name].[contenthash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isDevelopment ? "development" : "production"
      )
    }),
    isDevelopment &&
      new NodemonPlugin({
        watch: path.resolve("./"),
        ignore: ["node_modules/*", "dist/*"],
        script: "./index.js",
        ext: "js,html"
      }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        chunkFilename: "[name].[contenthash:8].chunk.css"
      }),
    new HtmlWebpackPlugin({
      template: "./src/views/index.html",
      minify: !isDevelopment,
      chunks: ["app"]
    })
  ].filter(Boolean),
  watch: isDevelopment,
  watchOptions: {
    ignored: /node_modules/
  }
};

if (!isDevelopment) {
  webpackConfig.devtool = "nosource-source-map";
}

module.exports = webpackConfig;
