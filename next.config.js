/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  env: {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '465',
    SMTP_USER: 'jonathanconcepcion1991@gmail.com',
    SMTP_PASS: 'SmV3xoU7gtsoByrT',
  },
}

module.exports = nextConfig
