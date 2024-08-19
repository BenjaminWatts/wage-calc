import React from 'react';
import Outputs from '@/src/components/outputs';
import InputsButtons from './inputs';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';

const Spacer: React.FC = () => <View style={{ height: 20 }} />;

export const HomeScreen: React.FC = () => {
  return (
    <ScrollView>
      <InputsButtons />
      <Spacer />
      <Outputs />
    </ScrollView>
  );
};
export default HomeScreen;
