/** @type {import('next').NextConfig} */
const nextConfig = {
    // Images configuration
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.eliayoussefdesigns.com',
                port: '',
                pathname: '/assets/**'
            },
            {
                protocol: 'http',
                hostname: '91.108.120.198',
                port: '',
                pathname: '/assets/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost:8055',
                port: '',
                pathname: '/assets/**'
            }

        ]
    },
};

export default nextConfig;
