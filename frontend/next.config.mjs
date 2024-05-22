import 'dotenv/config'
import createNextIntlPlugin from 'next-intl/plugin';
import StylelintPlugin from "stylelint-webpack-plugin"

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		dirs: ['cypress', 'messages', 'src'],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	reactStrictMode: false,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "http",
				hostname: process.env.NEXT_PUBLIC_BACKEND_HOST,
				port: process.env.NEXT_PUBLIC_BACKEND_PORT,
			}
		],
	},
	async rewrites() {
		return [
			{
				// matching all API routes
				source: `/graphql`,
				destination: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/graphql`,
			},
			{
				source: "/rails/:path*",
				destination: `http://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/rails/:path*`,
			}
		]
	},
	async headers() {
		return [
			{
				// matching all API routes
				source: "/graphql/:path*",
				headers: [
					{key: "Access-Control-Allow-Credentials", value: "true"},
					{key: "Access-Control-Allow-Origin", value: "localhost"}, // replace this your actual origin
					{key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT"},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
					},
				],
			}
		]
	},
	webpack: (config, options) => {
		config.plugins.push(new StylelintPlugin());
		return config;
	},
};

export default withNextIntl(nextConfig);
