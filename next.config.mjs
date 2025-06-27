/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow all images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
