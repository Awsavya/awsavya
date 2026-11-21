import type { NextConfig } from "next";

// Carried over from the classic site (git tag classic-site-final).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // The bare domain always goes to www (as on the classic site).
      { source: "/:path*", has: [{ type: "host", value: "awsavya.in" }], destination: "https://www.awsavya.in/:path*", permanent: true },
      // The old /animated preview now is the site.
      { source: "/animated", destination: "/", permanent: true },
      { source: "/animated/:path*", destination: "/:path*", permanent: true },
      // Old service URLs from the previous edition. "Emerging technologies" is no longer offered.
      { source: "/services/web-experiences", destination: "/services/websites-and-web-platforms", permanent: true },
      { source: "/services/application-development", destination: "/services/mobile-apps", permanent: true },
      { source: "/services/software-engineering", destination: "/services/custom-software", permanent: true },
      { source: "/services/artificial-intelligence", destination: "/services/applied-ai-and-automation", permanent: true },
      { source: "/services/emerging-technologies", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
