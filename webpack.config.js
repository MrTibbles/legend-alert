const path = require('path');
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const isInDev = env.production !== true

  return {
    entry: path.resolve(__dirname, 'src'),
    mode: isInDev ? 'development' : 'production',
    devtool: isInDev ? 'eval' : 'source-map',
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, 'dist'),
      port: 3000,
      stats: 'errors-warnings',
      proxy: {
        '/apex-api/**': {
          target: 'https://public-api.tracker.gg',
          pathRewrite: { '/apex-api/': '' },
          changeOrigin: true
        }
      }
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'legend-alert.[name].[hash].js'
    },
    module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: [
           {
             loader: 'babel-loader',
           },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: isInDev,
            },
          }
        ]
      },
      {
       test: /\.css$/,
       use: [
         {
           loader: MiniCssExtractPlugin.loader,
           options: {
             sourceMap: isInDev,
             hmr: isInDev
           },
         },
         'css-loader'
       ],
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        use: [{ loader: 'file-loader' }],
      },
     ]
    },
    plugins: [
      new webpack.DefinePlugin({ TRN_TOKEN: "'b8b9affa-afeb-41dd-ade1-025f9d1f1f77'" }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '🚨',
        template: path.resolve(__dirname, 'src/static/index.html'),
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        favicon: path.resolve(__dirname, 'src/favicon.ico')
      }),
      new MiniCssExtractPlugin({
        filename: 'linaria-styles.css',
      })
    ],
  }
}
