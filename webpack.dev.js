const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4200,
    contentBase: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true
    })
  ]
});
