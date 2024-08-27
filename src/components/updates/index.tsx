import React from 'react';
import { AppState } from 'react-native';
import * as u from 'expo-updates';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';

const WithUpdates: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [updating, setUpdating] = React.useState(false);

  const checkForUpdates = async () => {
    console.log('Checking for updates');
    try {
      const update = await u.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdating(true);
        await u.fetchUpdateAsync();
        u.reloadAsync();
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  };

  React.useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkForUpdates();
      }
    };

    const listener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      listener.remove();
    };
  }, []);

  if (!updating) return <>{children}</>;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Downloading Update" />
        <Card.Content>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithUpdates;
