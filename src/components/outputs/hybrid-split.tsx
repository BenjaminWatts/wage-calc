// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import { RootState } from '@/src/state/store';
import { selectAnnualSalary } from '@/src/state/user-inputs';
import React from 'react';
import { Card, List, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as r from '@/src/calcs/rounding';

export const CommutingImpactHourlyWages: React.FC = () => {
  const result = useCalculation();
  const { notAdjusted } = result.hybridSplits;
  const currentInofficeDays = useSelector(
    (r: RootState) => r.userInputs.daysPerWeekInOffice,
  );

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
  if (delta === 0) {
    return `If you were to work ${index + 1} days in the office`;
  }
  if (delta < 0) {
    return `If you were to work ${-delta} fewer days in the office i.e. just ${
      index + 1
    } days`;
  }
  return `If you work ${Math.abs(delta)} more days in the office`;
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

export const HybridSplitOutput: React.FC = () => {
  const result = useCalculation();
  const { adjusted } = result.hybridSplits;
  const daysInOffice = useSelector(
    (r: RootState) => r.userInputs.daysPerWeekInOffice,
  );
  const currentSalary = useSelector((r: RootState) => selectAnnualSalary(r));

  return (
    <Card>
      <Card.Content>
        <Paragraph>
          If you were to work a different number of days in the office, this is
          how it would impact your take home pay:
        </Paragraph>
        <List.Section>
          {adjusted.map((a, index) => {
            return (
              <List.Item
                key={index}
                title={renderTitle(index, daysInOffice)}
                description={renderDescription(currentSalary, a)}
              />
            );
          })}
        </List.Section>
      </Card.Content>
    </Card>
  );
};
