/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone'
  // publicRuntimeConfig: {
  //   baseUrl: process.env.NODE_ENV == 'development'
  //     ? 'http://localhost:3000'
  //     : 'http://localhost:3000', // Production URL
  // },
};

export default nextConfig;
