module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['https://nobarun.s3.us-east-2.amazonaws.com'],
  },
  async headers() {
    return [
      {
        source: '/assets',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
};
