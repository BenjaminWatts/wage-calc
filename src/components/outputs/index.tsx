import React from 'react';
import { Icon, List } from 'react-native-paper';
import { HybridSplitOutput } from './hybrid-split';
import TeacherOutput from './teacher';
import SummaryOutputs from './summary';
import { View, ScrollView } from 'react-native';
import MarginalTaxRatesBonuses from './marginal-tax-rate';
import ContractorOutput from './contractor';
import PrivacyButton from '@/src/atoms/privacy-button';

const iconSize = 32;

const Spacer: React.FC = () => <View style={{ height: 15 }} />;

const OutputExpandableAccordion: React.FC<{
  title: string;
  iconSource: string;
  initialExpanded: boolean;
  children: React.ReactNode;
}> = ({ title, iconSource, initialExpanded, children }) => {
  const [expanded, setExpanded] = React.useState(initialExpanded);
  return (
    <List.Accordion
      title={title}
      left={(p) => <Icon {...p} source={iconSource} size={iconSize} />}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
    >
      {children}
    </List.Accordion>
  );
};

const Outputs: React.FC = () => (
  <ScrollView
    contentContainerStyle={{
      padding: 5,
      gap: 15,
    }}
  >
    <OutputExpandableAccordion
      title="Your Current Income"
      iconSource="currency-gbp"
      initialExpanded={true}
    >
      <SummaryOutputs />
    </OutputExpandableAccordion>

    <OutputExpandableAccordion
      title="Marginal tax rate"
      iconSource="crown"
      initialExpanded={false}
    >
      <MarginalTaxRatesBonuses />
    </OutputExpandableAccordion>

    <OutputExpandableAccordion
      title="Hybrid Split"
      iconSource="car"
      initialExpanded={false}
    >
      <HybridSplitOutput />
    </OutputExpandableAccordion>

    <OutputExpandableAccordion
      title="Become a freelancer?"
      iconSource="bank"
      initialExpanded={false}
    >
      <ContractorOutput />
    </OutputExpandableAccordion>

    <OutputExpandableAccordion
      title="Become a teacher?"
      iconSource="school"
      initialExpanded={false}
    >
      <TeacherOutput />
    </OutputExpandableAccordion>
    <Spacer />

    <PrivacyButton />

    <Spacer />
  </ScrollView>
);

export default Outputs;
