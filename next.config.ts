import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/contact",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://api.oasbit.com",
              "frame-src https://api.oasbit.com",
              "connect-src 'self' https://api.oasbit.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rsg-ac.ca",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.rsg-ac.ca",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy-2",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/our-story",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/coworking-space",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
