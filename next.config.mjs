/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flowbite-admin-dashboard.vercel.app',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
