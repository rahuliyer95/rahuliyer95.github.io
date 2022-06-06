const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4200,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
});
