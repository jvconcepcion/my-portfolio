/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 465,
    SMTP_USER: 'jonathanconcepcion1991@gmail.com',
    SMTP_PASS: 'SmV3xoU7gtsoByrT',
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes next-i18next dependencies
          path: false,
          fs: false,
          // fixes mapbox dependencies
          events: false,
          // fixes sentry dependencies
          process: false,
          child_process: false,
        }
      };
    }
    return config;
  }
}

module.exports = nextConfig
