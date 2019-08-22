const path = require("path");
const glob = require("glob");
const CrittersWebpackPlugin = require("critters-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const buildPath = path.resolve(__dirname, "public");

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    filename: "[name].[hash:20].js",
    path: buildPath
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          map: {
            inline: false
          },
          discardComments: {
            removeAll: true
          }
        },
        canPrint: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [require("autoprefixer")()]
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
    new CleanWebpackPlugin(buildPath),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    new PurgeCssWebpackPlugin({
      paths: glob.sync(path.join(__dirname, "src", "**/*"), {
        nodir: true
      }),
      whitelistPatterns: [
        /^fp-.*$/,
        /^section.*$/,
        /^iScroll.*$/,
        /^active.*$/,
        /^read-.*$/
      ]
    }),
    new HtmlCriticalWebpackPlugin({
      base: buildPath,
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: false,
      penthouse: {
        blockJRequests: false
      }
    }),
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: "./src/assets/img/favicon.jpg",
      // The prefix for all image files (might be a folder or a name)
      prefix: "icons-[hash]/",
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
        windows: false
      }
    }),
    new CrittersWebpackPlugin({
      preload: 'swap',
      preloadFonts: true
    })
  ]
});
