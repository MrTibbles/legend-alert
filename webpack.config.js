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
  const isInDev = env.production !== true;

  const PATHS = {
    src: path.resolve(__dirname, "src/client"),
    dist: path.resolve(__dirname, "dist", isInDev ? "" : "public/")
  };

  return {
    entry: path.resolve(PATHS.src, "App.tsx"),
    mode: isInDev ? "development" : "production",
    devtool: isInDev ? "eval" : "source-map",
    devServer: {
      hot: true,
      historyApiFallback: true,
      contentBase: PATHS.dist,
      port: 3000,
      stats: "errors-warnings"
    },
    output: {
      path: PATHS.dist,
      publicPath: isInDev ? "/" : "/public/",
      filename: "legend-alert.[name].[hash].js"
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
              loader: "awesome-typescript-loader"
            },
            {
              loader: "linaria/loader",
              options: {
                sourceMap: isInDev
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
                sourceMap: isInDev,
                hmr: isInDev
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
        PRODUCTION_ENV: !isInDev,
        GRAPHQL_API: JSON.stringify(
          isInDev ? "http://localhost:4000" : "/graphql"
        )
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
        filename: isInDev ? "linaria-styles.css" : "linaria-styles.[hash].css",
        chunkFilename: isInDev ? "[id].css" : "[id].[hash].css"
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
    ]
  };
};
