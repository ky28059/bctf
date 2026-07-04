const RCTF_BASE = 'https://rctf-internal.b01lers.net/';

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE: `${RCTF_BASE}/api/v1`,
        KLODD_URL: 'https://instancer.b01lersc.tf'
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    async rewrites() {
        // Rewrite attempts to call the rCTF backend to their actual destination.
        return [
            {
                source: '/api/v1/:path*',
                destination: `${RCTF_BASE}/api/v1/:path*`
            },
            {
                source: '/uploads',
                destination: `${RCTF_BASE}/uploads`,
            }
        ]
    }
}

module.exports = nextConfig;
