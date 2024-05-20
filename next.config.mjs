const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "img.clerk.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;