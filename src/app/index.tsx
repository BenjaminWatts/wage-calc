import { useRouter } from 'expo-router';
import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import PrivacyButton from '../atoms/privacy-button';

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
        <View style={{ height: 10 }} />

        <Card.Actions>
          <Button
            // make super prominent
            mode="contained"
            style={{ width: '100%' }}
            onPress={() => nav.replace('/inputs')}
          >
            Get started
          </Button>
        </Card.Actions>
      </Card>

      <PrivacyButton />
    </View>
  );
};

export default HomeScreen;
