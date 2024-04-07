/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE: process.env.NODE_ENV === 'development'
            ? 'https://platform.lac.tf/api/v1'
            : 'http://ctf.b01lers.com:9000/api/v1',
        KLODD_URL: 'https://klodd.localhost.direct' // TODO
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
                destination: `${this.env.API_BASE}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
