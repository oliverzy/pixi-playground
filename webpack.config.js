const path = require('path');
const fs = require('fs');
const CommonConfigWebpackPlugin = require('common-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.ENV;

const config = {
  mode: ENV === 'product' ? 'production' : 'development',
  devtool: ENV === 'dev' ? 'eval-source-map' : false,
  entry: {},
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.xml$/,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new CommonConfigWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunks: [],
      filename: 'index.html'
    }),
  ],
};

fs.readdirSync(process.cwd()).filter(f => fs.statSync(f).isDirectory() && !/^(\.|node_modules|public)/.test(f)).forEach(f => {
  console.log('Found:', f);
  config.entry[f] = `./${f}/index.js`;
  config.plugins.push(new HtmlWebpackPlugin({
    template: `${f}/index.html`,
    chunks: [f],
    filename: `${f}.html`
  }))
});

module.exports = config;
