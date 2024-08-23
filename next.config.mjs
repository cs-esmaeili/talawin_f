/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'back.talawin.ir',
            },
            {
                protocol: 'http',
                hostname: 'back.talawin.ir',
            },
            {
                protocol: 'https',
                hostname: 'www.back.talawin.ir',
            },
            {
                protocol: 'http',
                hostname: 'www.back.talawin.ir',
            }
        ],
    },
};

export default nextConfig;
