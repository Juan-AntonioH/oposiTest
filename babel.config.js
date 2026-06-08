module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/core': './src/core',
            '@/features': './src/features',
            '@/navigation': './src/navigation',
            '@/providers': './src/providers',
            '@/shared': './src/shared',
            '@/store': './src/store',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
};
