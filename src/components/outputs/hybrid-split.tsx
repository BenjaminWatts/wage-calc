// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import { RootState } from '@/src/state/store';
import { selectAnnualSalary } from '@/src/state/user-inputs';
import React from 'react';
import { Card, List, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as r from '@/src/calcs/rounding';
import { View } from 'react-native';

export const CommutingImpactHourlyWages: React.FC = () => {
  const currentInofficeDays = useSelector(
    (r: RootState) => r.userInputs.daysPerWeekInOffice,
  );
  const result = useCalculation();
  if (!result) return null;
  const { notAdjusted } = result.hybridSplits;

  return (
    <Card>
      <Card.Content>
        <Paragraph>
          You currently spent {currentInofficeDays} days in the office.
        </Paragraph>
        <Paragraph>
          If your employer changes the number of days your have to spend in the
          office without any adjustments to your salary, this is how it impacts
          your hourly pay (including commuting time and any knock-on effects to
          childcare, eating out, dog walking etc):
        </Paragraph>
        <List.Section>
          {notAdjusted.map((a, index) => (
            <List.Item
              key={index}
              title={`${index + 1} days onsite`}
              description={`${r.financial.hourly(a.netHourlyPay)}/hour`}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const renderTitle = (index: number, daysInOffice: number) => {
  const delta = index - daysInOffice;
  const newDaysInOffice = index;
  if (delta === 0) {
    return `If you were to work ${newDaysInOffice} days in the office`;
  }
  if (delta < 0) {
    if (newDaysInOffice === 0) {
      return 'If you were to go fully remote';
    }
    const dayText = newDaysInOffice === 1 ? 'day' : 'days';
    return `If you were to work ${-delta} fewer days in the office, i.e. just ${newDaysInOffice} ${dayText}`;
  }
  return `If you were to work ${Math.abs(
    delta,
  )} more days in the office, i.e. ${newDaysInOffice} days in total`;
};

const renderDescription = (currentSalary: number, equivalentSalary: number) => {
  const delta = equivalentSalary - currentSalary;
  if (delta === 0) {
    return `That is the status quo and your take home pay is ${r.financial.annual(
      currentSalary,
    )}`;
  }
  if (delta > 0) {
    return `You would need a payrise of ${r.financial.annual(
      delta,
    )} to maintain your current take home pay`;
  }
  return `You could take a salary cut of ${r.financial.annual(
    -delta,
  )} and maintain your current take home pay`;
};

const OptionCard: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => (
  <Card>
    <Card.Content>
      <Paragraph
        style={{
          fontWeight: 'bold',
        }}
      >
        {title}
      </Paragraph>
      <Paragraph>{description}</Paragraph>
    </Card.Content>
  </Card>
);

const OptionWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <View style={{ gap: 10, marginVertical: 10, display: 'flex' }}>
    {children}
  </View>
);

export const HybridSplitOutput: React.FC = () => {
  const daysInOffice = useSelector(
    (r: RootState) => r.userInputs.daysPerWeekInOffice,
  );
  const currentSalary = useSelector((r: RootState) => selectAnnualSalary(r));
  const result = useCalculation();
  if (!result) return null;
  const { adjusted } = result.hybridSplits;

  return (
    <>
      <Paragraph>
        If you were to work fewer days in the office, this is how it would
        impact your take home pay:
      </Paragraph>
      <OptionWrapper>
        {adjusted.map((a, index) => {
          if (index >= daysInOffice) return null;
          const title = renderTitle(index, daysInOffice);
          const description = renderDescription(currentSalary, a);
          return (
            <OptionCard key={index} title={title} description={description} />
          );
        })}
      </OptionWrapper>
      {/* </List.Section> */}

      <Paragraph>
        If you were to work more days in the office, this is how it would impact
        your take home pay:
      </Paragraph>
      <OptionWrapper>
        {adjusted.map((a, index) => {
          if (index <= daysInOffice) return null;
          return (
            <OptionCard
              key={index}
              title={renderTitle(index, daysInOffice)}
              description={renderDescription(currentSalary, a)}
            />
          );
        })}
      </OptionWrapper>
    </>
  );
};
