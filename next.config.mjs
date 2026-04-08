/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sariasoftware.com"
          }
        ],
        destination: "https://sariasoftware.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
