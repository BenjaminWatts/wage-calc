// redirect to /inputs

import { useRouter } from 'expo-router';
import React from 'react';
import { Image, View } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

const HomeScreen: React.FC = () => {
  const nav = useRouter();
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card>
        <Card.Content>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{
              height: 200,
              width: 200,
            }}
          />
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title="CostofWork.app calculator" />
        <Card.Content>
          <Paragraph>Welcome to the CostofWork.app calculator.</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => nav.replace('/inputs')}>Get started</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeScreen;
