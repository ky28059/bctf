/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_BASE: process.env.NODE_ENV === 'development'
            ? 'https://platform.lac.tf/api/v1'
            : 'http://ctf.b01lers.com:9000/api/v1'
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

module.exports = nextConfig
