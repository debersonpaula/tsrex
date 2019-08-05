const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	target: 'node',
	mode: 'production',
	// ==== ENTRY ============================================================================
	entry: [path.join(__dirname, '../src/tsrex.ts')],
	// ==== OUTPUT ===========================================================================
	output: {
		path: path.join(__dirname, '../dist-bin'),
		filename: 'tsrex.js',
		sourcePrefix: '',
		libraryTarget: 'commonjs',
	},
	// ==== MODULE ===========================================================================
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.js$/,
			},
			{ test: /\.tsx?$/, loader: 'ts-loader' },
		],
	},
	// ==== RESOLVE ===========================================================================
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	// ==== PLUGINS ===========================================================================
	plugins: [
		new CleanWebpackPlugin({
			dry: false,
			verbose: true,
			cleanOnceBeforeBuildPatterns: [
				path.join(__dirname, '../dist-bin', '/**/*'),
			],
		}),
	],

	// ==== EXTERNALS =========================================================================
	externals: generateExternals([
		'awesome-typescript-loader',
		'axios',
		'enzyme',
		'exredux',
		'html-webpack-plugin',
		'jest',
		'react',
		'react-dom',
		'uglifyjs-webpack-plugin',
		'webpack',
		'webpack-bundle-analyzer',
		'webpack-dev-server'
	]),
};

function generateExternals(list) {
	return list.reduce((total, current) => {
		total[current] = {
			commonjs: current,
		};
		return total;
	}, {});
}
