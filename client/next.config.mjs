/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com', 'placehold.co'],
        dangerouslyAllowSVG: true,
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
