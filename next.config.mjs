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
                hostname: 'admin.eliayoussefdesigns.com',
                port: '',
                pathname: '/assets/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '',
                // pathname: '/assets/**'
            }

        ]
    },
};

export default nextConfig;
