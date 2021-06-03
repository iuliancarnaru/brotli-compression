const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'client/src', 'index.js')],
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/template.html',
    }),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
};
