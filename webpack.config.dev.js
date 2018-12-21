const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  entry: path.resolve(process.cwd(), 'example', 'index.tsx'),
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(process.cwd(), 'example'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'example', 'index.html'),
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 8888,
    historyApiFallback: true,
    open: true,
  },
};
