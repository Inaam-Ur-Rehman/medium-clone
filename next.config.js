/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["miro.medium.com", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        hostname: "fqquhgrdfmqogqaabznj.supabase.co",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "miro.medium.com",
      },
    ],
  },
};

module.exports = nextConfig;
