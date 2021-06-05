const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js', // Cache Busting with [contentHash]
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // fallback to style-loader in development
          'style-loader', // Inject styles into the DOM
          {
            loader: 'css-loader', // Turns css into commonjs
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader', // Turns sass into css
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
