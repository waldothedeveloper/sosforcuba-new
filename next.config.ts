import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/events-on-july-11-2021", destination: "/articles/july-11-2021", permanent: true },
      { source: "/cuban-gov-response", destination: "/articles/cuban-government-response", permanent: true },
      { source: "/internet-ban", destination: "/articles/internet-blackout-july-2021", permanent: true },
      { source: "/detained-people", destination: "/articles/missing-and-detained-after-july-11", permanent: true },
      { source: "/human-rights-violations-in-cuba", destination: "/human-rights", permanent: true },
      { source: "/help-center", destination: "/resources", permanent: true },
      { source: "/help_center", destination: "/resources", permanent: true },
      { source: "/protests", destination: "/july-11", permanent: true },
      { source: "/submit-protest", destination: "/articles", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true }
    ];
  }
};

export default nextConfig;
