var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './public/index'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'public')
      },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?browsers=last 10 version'},
      { test: /\.tff|.woff2|.woff|.svg|.eot|.tff/, loader: 'null' },
      { test: /\.jpg|.png/, loader: 'url' }
    ]
  }
};
