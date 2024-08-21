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
import store from '@/src/state/store';
import ErrorBoundary from '../components/error-boundary';
import { Helmet } from 'react-helmet';

SplashScreen.preventAutoHideAsync();

const MainStack: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <ErrorBoundary>
      <Helmet>
        <title>CostofWork.app calculator</title>
      </Helmet>
      <Provider store={store}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="terms"
              options={{
                title: 'Terms and Conditions',
              }}
            />
          </Stack>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default MainStack;
