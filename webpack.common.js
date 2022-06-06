module.exports = {
  entry: "./src/index.js",
  output: {
    assetModuleFilename: "[path][name].[ext]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        type: "asset",
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        type: "asset",
      },
    ],
  },
  plugins: [],
};
