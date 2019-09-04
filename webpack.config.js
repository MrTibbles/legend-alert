const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env = {}) => {
  const devEnv = env.production !== true;

  const ciEnv = process.env.CI_ENV || false;
  const publicPath = devEnv || ciEnv ? "/" : "/public/";

  const PATHS = {
    src: path.resolve(__dirname, "src/client"),
    dist: path.resolve(__dirname, "dist", devEnv ? "" : "public/")
  };

  const babelOptions = {
    presets: [
      [
        "@babel/env",
        {
          "useBuiltIns": "usage",
          "corejs": "3",
          "targets": {
            "browsers": devEnv
              ? ["last 2 Chrome versions, last 2 Firefox versions", "last 2 Edge versions"]
              : ["> 5%", "not ie 11"]
          }
        }
      ]
    ]
  }

  return {
    entry: path.resolve(PATHS.src, "App.tsx"),
    mode: devEnv ? "development" : "production",
    devtool: devEnv ? "eval" : "source-map",
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: PATHS.dist,
      port: 3000,
      stats: "errors-warnings"
    },
    output: {
      path: PATHS.dist,
      publicPath: publicPath,
      filename: "legend-alert.[name].[hash].js",
      chunkFilename: "legend-alert.[name].[chunk].js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: babelOptions
            },
            {
              loader: "linaria/loader",
              options: {
                sourceMap: devEnv
              }
            }
          ]
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: devEnv,
                hmr: devEnv
              }
            },
            "css-loader"
          ]
        },
        {
          test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
          use: [{ loader: "file-loader" }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        PRODUCTION_ENV: ciEnv || !devEnv,
        GRAPHQL_API: JSON.stringify(
          devEnv ? "http://localhost:4000" : "/graphql"
        ),
        PUBLIC_PATH: JSON.stringify(publicPath)
      }),
      new HtmlWebpackPlugin({
        title: "🚨",
        template: path.resolve(PATHS.src, "static/index.html"),
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
        },
        favicon: path.resolve(PATHS.src, "favicon.ico")
      }),
      new MiniCssExtractPlugin({
        filename: devEnv ? "linaria-styles.css" : "linaria-styles.[hash].css",
        chunkFilename: devEnv ? "[id].css" : "[id].[hash].css"
      }),
      new CopyPlugin([
        {
          from: path.resolve(PATHS.src, "favicon.ico"),
          to: PATHS.dist
        },
        {
          from: path.resolve(PATHS.src, "manifest.json"),
          to: PATHS.dist
        },
        {
          from: path.resolve(PATHS.src, "images/"),
          to: path.resolve(PATHS.dist, "images/"),
          ignore: [".*", "*.svg"]
        }
      ]),
      new GenerateSW()
    ],
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  };
};
