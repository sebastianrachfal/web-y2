const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const resolvePath = (name) => path.resolve(__dirname, `src/${name}`);

module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	devtool: 'eval-cheap-source-map',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			'@/helpers': resolvePath('helpers'),
			'@/classes': resolvePath('classes'),
			'@/types': resolvePath('types'),
			'@/storage': resolvePath('classes/storage'),
			'@/config': resolvePath('config.ts'),
			'@/decorators': resolvePath('decorators'),
		},
	},
	plugins: [
		new CopyPlugin([
			{
				from: './src/index.html',
				to: '',
				flatten: true,
			},
			{
				from: './src/assets/favicon.ico',
				to: 'assets/',
				flatten: true,
			},
		]),
	],
	module: {
		rules: [
			// all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					{
						loader: 'style-loader',
						// options: {
						//   // injectType: "singletonStyleTag"
						//   // injectType: "linkTag"
						// }
					},
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
};
