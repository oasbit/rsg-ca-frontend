import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const contactCsp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://api.oasbit.com`,
  "frame-src https://api.oasbit.com",
  "connect-src 'self' https://api.oasbit.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/contact",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contactCsp,
          },
        ],
      },
    ];
  },
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [],
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
