/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")();

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    serverActions: {
      allowedOrigins: ["app.localhost:3000"],
    },
  },
  images: {
    remotePatterns: [
      { hostname: "cdngovbr-ds.estaleiro.serpro.gov.br" },
      { hostname: "public.blob.vercel-storage.com" },
      { hostname: "be6gfqnmzh19ics7.public.blob.vercel-storage.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "flag.vercel.app" },
      { hostname: "illustrations.popsy.co" },
      { hostname: "tailus.io" },
      { hostname: "images.unsplash.com" },
      { hostname: "cdn.devdojo.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/conteudos",
        destination: "/conteudos/posts",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
