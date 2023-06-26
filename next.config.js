/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["plotly.js"]);

const nextConfig = {
	reactStrictMode: true,
	// Add other Next.js configuration options here
};

module.exports = withTM(nextConfig);