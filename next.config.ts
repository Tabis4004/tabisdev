import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Donne accès aux bindings Cloudflare (IMAGES, ASSETS…) pendant `npm run dev`
initOpenNextCloudflareForDev();
