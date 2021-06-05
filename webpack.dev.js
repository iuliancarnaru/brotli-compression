const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js', // Cache Busting with [contentHash]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // fallback to style-loader in development
          'style-loader', // Inject styles into the DOM
          { loader: 'css-loader', options: { sourceMap: true } },
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
});
