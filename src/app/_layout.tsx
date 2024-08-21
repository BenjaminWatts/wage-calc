import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store, { persistor } from '@/src/state/store';
import ErrorBoundary from '../components/error-boundary';
import { Helmet } from 'react-helmet';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

const MainStack: React.FC = () => {
  const colorScheme = useColorScheme();

  // hide the splash screen
  SplashScreen.hideAsync();

  return (
    <ErrorBoundary>
      <Helmet>
        <title>CostofWork.app calculator</title>
      </Helmet>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{
                headerShown: true,
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="terms"
                options={{
                  title: 'Terms and Conditions',
                }}
              />
            </Stack>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default MainStack;
