//const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

//const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',

  output: {
      filename: 'js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js',
      pathinfo: false
    },
    experimental: {
      granularChunks: true
    },

  plugins: [
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.(js|css|html|svg)$/,
        compressionOptions: { level: 11 },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      })
/*     new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      cache: true,
      parallel: true,
      sourceMap: false,
      output: {
        comments: false
      }
    }) */
  ]
});
