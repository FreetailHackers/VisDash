var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		vendor: [path.join(__dirname, "vendors.js")]
	},
	output: {
		path: path.join(__dirname, "../public/js"),
		filename: "[name].js",
		library: "[name]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "[name]-manifest.json"),
			name: "[name]",
			context: path.resolve(__dirname, "build")
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
};
