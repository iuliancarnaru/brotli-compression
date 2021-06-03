const { join } = require('path');

module.exports = {
  entry: ['@babel/polyfill', join(__dirname, 'client/src', 'index.js')],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'stylus-loader',
        ],
      },
    ],
  },
  plugins: [],
  devtool: 'eval-source-map',
  watch: true,
};
