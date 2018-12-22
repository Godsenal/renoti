const common = require('./webpack.common');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    ...common.output,
    filename: 'bundle.js',
  },
  devServer: {
    host: 'localhost',
    port: 8888,
    historyApiFallback: true,
    open: true,
  },
};
