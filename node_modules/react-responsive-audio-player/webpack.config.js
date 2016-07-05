var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  entry: './src/index.js',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    library: 'AudioPlayer',
    filename: 'audioplayer.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ["> 2%"] })];
  },
  externals: {
    'react': {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'classnames': {
      root: 'classNames',
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames'
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('audioplayer.css', {
      allChunks: true
    })
  ]
};

module.exports = webpackConfig;
