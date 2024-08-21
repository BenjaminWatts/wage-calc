import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { FallbackComponentProps } from 'react-native-error-boundary';
import RNR from 'react-native-restart';

const resetApp = () => {
  if (Platform.OS === 'web') {
    window.location.replace('/');
  } else {
    RNR.Restart();
  }
};

const FallbackComponent: React.FC<FallbackComponentProps> = (p) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: '80%',
          padding: 10,
        }}
      >
        <Card.Title title="Application Error" />

        <Card.Content>
          <Paragraph>An error has occurred</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={resetApp}>Reset App</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
};

export default FallbackComponent;
