// // Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;


// // metro.config.js
// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig();
//   return {
//     ...defaultConfig,
//     // watchFolders: ['.'], // Customize this to watch fewer folders if necessary
//     resolver: {
//       blacklistRE: /node_modules\/.*/,
//     },
//   };
// })();