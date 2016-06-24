const path = require('path');
const webpack = require('webpack');
const dir = path.resolve(__dirname);

module.exports = {
  context: dir + '/src',
  entry: './index.js',
  output: {
    path: dir + '/dist',
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [{
      test: 'src',
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.OldWatchingPlugin() // fixed webpack --watch not works in some OS
  ]
};
