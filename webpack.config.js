const path = require('path');
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      stats: 'errors-warnings'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'legend-alert.[name].[hash].js'
    },
    plugins: [
      new webpack.DefinePlugin({ foo: 'bar' }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: '🚨',
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        }
      }),
    ],
  }
}
