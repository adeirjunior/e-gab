/** @type {import('next').NextConfig} */
const nextConfig =  {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdngovbr-ds.estaleiro.serpro.gov.br'
        },
      ],
    },
  }
module.exports = nextConfig
