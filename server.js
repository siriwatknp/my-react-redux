const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const host = 'localhost';
const port = 3000;

new WebpackDevServer(webpack(config), {
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true // color is life
	}
})
	.listen(port, host, (err) => {
		if (err) {
			console.log(err);
		}
		console.log(`Listening at ${host}:${port}`);
	});