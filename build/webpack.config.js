var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: './app/react/index.js',
  output: { path: path.join(__dirname, "../public/js"), filename: 'bundle.js' },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "build"),
      manifest: require("./vendor-manifest.json")
    }),
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true
        }
      }
    ]
  },
};
