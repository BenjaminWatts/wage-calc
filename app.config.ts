module.exports = {
  expo: {
    name: 'CostOfWork.app',
    slug: 'CostOfWork',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './public/icon.png',
    scheme: 'costofwork',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './public/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.benjaminwatts.CostOfWork',
      jsEngine: 'jsc',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './public/icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.benjaminwatts.CostOfWork',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './public/icon.png',
      shortName: 'CostOfWork',
      title: 'CostOfWork.app',
    },
    plugins: [
      'expo-router',
      [
        '@sentry/react-native/expo',
        {
          url: 'https://sentry.io/',
          project: 'cost-of-work',
          organization: 'kilowattsio',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'e737c6da-f820-4eb0-974c-e431d31aacf9',
      },
    },
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/e737c6da-f820-4eb0-974c-e431d31aacf9',
    },
  },
};
