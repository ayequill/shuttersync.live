/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // webpack5: true,
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
                protocol: 'https',
            },
            {
                hostname: 'images.unsplash.com',
                protocol: 'https',
            },
            {
                hostname: 'placehold.co',
                protocol: 'https',
            },
            {
                hostname: 'ui-avatars.com',
                protocol: 'https',
            },
            {
                hostname: 'via.placeholder.com',
                protocol: 'https',
            },
        ]
    },
    // async headers() {
    //     return [
    //     {
    //         source: '/(.*)',
    //         headers: securityHeaders,
    //     },
    //     ];
    // },
};

export default nextConfig;
