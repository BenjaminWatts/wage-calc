import React from 'react';
import { Card, Icon, List } from 'react-native-paper';
import HybridSplit from './hybrid-split';
import TeacherOutput from './teacher';
import SummaryOutputs from './summary';
import { View, StyleSheet } from 'react-native';

const iconSize = 32;

const Outputs: React.FC = () => (
  <Card>
    <Card.Title
      title="Outputs"
      left={(p) => <Icon {...p} source="calculator" />}
    />
    <List.Accordion
      title="Your Current Income"
      left={(p) => <Icon {...p} source="currency-gbp" size={iconSize} />}
    >
      <SummaryOutputs />
    </List.Accordion>
    <List.Accordion
      title="Home vs Office"
      left={(p) => <Icon {...p} source="home" size={iconSize} />}
    >
      <HybridSplit />
    </List.Accordion>
    <List.Accordion
      title="Become a teacher"
      left={(p) => <Icon {...p} source="school" size={iconSize} />}
    >
      <TeacherOutput />
    </List.Accordion>
  </Card>
);
const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
});

export default Outputs;
