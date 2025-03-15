// eslint-disable-next-line @typescript-eslint/no-var-requires
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ajout du plugin de compression d'images
      webpackConfig.optimization.minimizer = [
        ...webpackConfig.optimization.minimizer,
        // Pour les formats JPG, PNG, WebP, AVIF
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: {
                  quality: 80,
                },
                webp: {
                  lossless: false,
                  quality: 85,
                },
                avif: {
                  lossless: false,
                  quality: 85,
                },
                png: {
                  quality: 80,
                },
              },
            },
          },
        }),
        // Pour les SVG
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.svgoMinify,
            options: {
              encodeOptions: {
                multipass: true,
                plugins: [
                  'preset-default',
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        }),
      ];
      return webpackConfig;
    },
  },
};
