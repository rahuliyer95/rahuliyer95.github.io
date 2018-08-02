const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[path][name].[ext]",
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      tether: "tether",
      Tether: "tether",
      "window.Tether": "tether",
      Popper: ["popper.js", "default"],
      "window.Tether": "tether"
    })
  ]
};
