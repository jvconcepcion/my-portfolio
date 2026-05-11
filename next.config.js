/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mndiyvykmqgusrzbzbtu.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  env: {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '465',
    SMTP_USER: 'jonathanconcepcion1991@gmail.com',
    SMTP_PASS: 'SmV3xoU7gtsoByrT',
  },
}

module.exports = nextConfig
