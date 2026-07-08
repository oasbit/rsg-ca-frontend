import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
