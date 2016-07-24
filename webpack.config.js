var webpack = require('webpack');
var path  = require('path')
module.exports = {
	devtool:'cheap-module-source-map',
	entry:[
		// 'webpack-hot-middleware/client',
		'whatwg-fetch',
		'./container/container.js'
	],
	output:{
		path:require("path").resolve("./public/"),
		filename:'bundle.js',
		publicPath:'/'
	},
	plugins:[
		// new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		// new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
		new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
	],
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
				query:{
					presets:['react','es2015']
				}
			},
			{
          test: /\.css$/,
          exclude: /(s-alert-default.css|s-alert-css-effects|normalize.css|audioplayer.css|bootstrap.min.css|font-awesome.css)/,
          loader: 'style-loader!css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]'
      },
      {
          test: /\.css$/,
          include: /(s-alert-default.css|s-alert-css-effects|normalize.css|audioplayer.css|bootstrap.min.css|font-awesome.css)/,
          loader: 'style-loader!css-loader?sourceMap'
      },
      {
          test: /\.(png|jpg)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'url-loader'
      },
			{
				test: /\.less$/,
  			loader: 'style!css!less'
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader"},
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
		]
	}
}
