import React from 'react';
import HybridSplit from './hybrid-split';
import TeacherOutput from './teacher';
import { ScrollView } from 'react-native-gesture-handler';

const Outputs: React.FC = () => (
  <ScrollView>
    <HybridSplit />
    <TeacherOutput />
  </ScrollView>
);

export default Outputs;
