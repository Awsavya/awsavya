import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ["127.0.0.1"],
  // Old service URLs from the previous edition. "Emerging technologies" is no longer offered.
  async redirects() {
    return [
      { source: "/services/web-experiences", destination: "/services/websites-and-web-platforms", permanent: true },
      { source: "/services/application-development", destination: "/services/mobile-apps", permanent: true },
      { source: "/services/software-engineering", destination: "/services/custom-software", permanent: true },
      { source: "/services/artificial-intelligence", destination: "/services/applied-ai-and-automation", permanent: true },
      { source: "/services/emerging-technologies", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
