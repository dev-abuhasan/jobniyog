import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: false,
  env: {
    NEXT_TELEMETRY_DISABLED: '1'
  },

  images: {
    // Keep only WebP — AVIF encoding is very CPU-intensive and causes
    // /_next/image to time out on large originals. Cloudinary images
    // bypass this optimizer entirely (served directly with f_auto/q_auto).
    formats: ['image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 400],
    qualities: [75],
    minimumCacheTTL: 31536000, // 1 year
    // ⚠ Keep in sync with components/atoms/img.tsx → CONFIGURED_IMAGE_HOSTS.
    // The Img atom serves any host NOT listed here as `unoptimized` so an
    // unconfigured image URL (e.g. from a product import) degrades gracefully
    // instead of throwing a render-time 500.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      // Cloudinary images go through Cloudinary CDN directly (unoptimized=true
      // in the Img atom) — this entry remains so next/image doesn't block the
      // domain for any edge case that still routes through the optimizer.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_IS_PRODUCTION !== 'true' ? { exclude: ['error', 'warn', 'log'] } : false
  },

  productionBrowserSourceMaps: false,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
