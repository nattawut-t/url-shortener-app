const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'AUTHEN_URL': JSON.stringify('http://35.198.215.103:3000/api'),
        'URL_SHORTENER_URL': JSON.stringify('http://url-shortener-api/api'),
      },
    }),
  ],
})