const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
	devtool:'eval-source-map',
	entry:[
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'./app/index.js',
		'./app/sass/main.scss'
	],
	output:{
		path: path.join(__dirname,'build'),
		filename: '[name].js',
	},
	module:{
		loaders:[
			{
				test:/\.jsx?/,
				exclude: /node_modules/,
				loaders:['babel-loader']
			},
			{
				test: /\.scss$/i,
				loader: extractCSS.extract(['css','sass']),
				exclude:/node_modules/
			},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			title: 'My React Redux',
			template: './app/index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		extractCSS
	],
	resolve:{
		extensions:['.js','.jsx']
	}
};