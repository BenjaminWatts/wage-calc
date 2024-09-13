import React from 'react';
import { Icon, List } from 'react-native-paper';
import { HybridSplitOutput } from './hybrid-split';
import TeacherOutput from './teacher';
import SummaryOutputs from './summary';
import { View, ScrollView } from 'react-native';
import MarginalTaxRatesBonuses from './marginal-tax-rate';
import ContractorOutput from './contractor';
import PrivacyButton from '@/src/atoms/privacy-button';
import ListAccordion from '@/src/atoms/accordion';

const iconSize = 32;

const Spacer: React.FC = () => <View style={{ height: 15 }} />;

const OutputExpandableAccordion: React.FC<{
  title: string;
  iconSource: string;
  initialExpanded: boolean;
  children: React.ReactNode;
}> = ({ title, iconSource, initialExpanded, children }) => {
  return (
    <ListAccordion
      title={title}
      icon={iconSource}
      iniitalExpanded={initialExpanded}
    >
      {children}
    </ListAccordion>
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
      title="Status quo"
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
      title="Go freelance?"
      iconSource="bank"
      initialExpanded={false}
    >
      <ContractorOutput />
    </OutputExpandableAccordion>

    <OutputExpandableAccordion
      title="Teach?"
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
