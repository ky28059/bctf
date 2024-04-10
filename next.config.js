/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE: 'http://ctf.b01lers.com:9000/api/v1',
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
                destination: `${this.env.API_BASE}/:path*`
            }
        ]
    }
}

module.exports = nextConfig
