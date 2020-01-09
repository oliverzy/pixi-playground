const path = require('path');
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.ENV;

module.exports = {
  mode: ENV === 'product' ? 'production' : 'development',
  devtool: ENV === 'dev' ? 'eval-source-map' : false,
  entry: {
    fireworks: './fireworks/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new CommonConfigWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'fireworks/index.html',
      chunks: ['fireworks'],
      filename: 'fireworks.html',
      inject: true
    })
  ],

};
