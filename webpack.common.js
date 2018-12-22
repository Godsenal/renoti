const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  entry: path.resolve(process.cwd(), 'example', 'index.tsx'),
  output: {
    path: path.resolve(process.cwd(), 'example'),
    publicPath: '/',
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
};
