const path = require("path");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const buildPath = path.resolve(__dirname, "public");

module.exports = merge(commonConfig, {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash:20].js",
    path: buildPath,
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: "postcss-loader",
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      inject: "body",
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:20].css",
      chunkFilename: "[id].[chunkhash:20].css",
    }),
    new PurgeCssWebpackPlugin({
      paths: glob.sync(path.join(__dirname, "src", "**/*"), {
        nodir: true,
      }),
      whitelistPatterns: [
        /^fp-.*$/,
        /^section.*$/,
        /^iScroll.*$/,
        /^active.*$/,
        /^read-.*$/,
      ],
    }),
    new HtmlCriticalWebpackPlugin({
      base: buildPath,
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: false,
      penthouse: {
        blockJRequests: false,
      },
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: "./src/assets/img/favicon.jpg",
      // The prefix for all image files (might be a folder or a name)
      prefix: "icons-[chunkhash:20]/",
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: "#fff",
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: "Rahul Iyer",

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
});
