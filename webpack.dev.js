const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { resolve } = path

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // hot: true,
    inline: true,
    host: '0.0.0.0',
    contentBase: './',
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev'),
        'AUTHEN_URL': JSON.stringify('http://0.0.0.0:3000/api'),
        'URL_SHORTENER_URL': JSON.stringify('http://0.0.0.0:3001/api'),
      },
    }),
  ],
})