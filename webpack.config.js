var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, 'app/static'),
    filename: 'index.js',
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "app/static"),
    filename: 'index.js',
    compress: true,
    watchContentBase: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      "node_modules"
    ]
  },
  target: 'web',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
