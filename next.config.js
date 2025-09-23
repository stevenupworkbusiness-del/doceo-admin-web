/** @type {import('next').NextConfig} */
const webpack = require('webpack');

const nextConfig = {
	reactStrictMode: false,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.amazonaws.com',
			},
		],
	},
	webpack: config => {
		config.plugins.push(
			new webpack.ProvidePlugin({
				process: 'process/browser',
				Buffer: ['buffer', 'Buffer'],
			}),
			new webpack.NormalModuleReplacementPlugin(/node:/, resource => {
				const mod = resource.request.replace(/^node:/, '');
				switch (mod) {
					case 'buffer':
						resource.request = 'buffer';
						break;
					case 'stream':
						resource.request = 'readable-stream';
						break;
					default:
						throw new Error(`Not found ${mod}`);
				}
			}),
		);

		return config;
	},
};

module.exports = nextConfig;
