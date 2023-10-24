module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigations': ['./src/navigations'],
          '@components': ['./src/components'],
          '@store': ['./src/store'], 
          '@screens': ['./src/screens'],
          '@assets': ['./src/assets'],
          '@mock': ['./src/mock'],
          '@utils': ['./src/utils'],
        },
      },
    ],
  ],
};
