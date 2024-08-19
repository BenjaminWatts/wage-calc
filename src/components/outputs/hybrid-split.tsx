// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import { RootState } from '@/src/state/store';
import { selectAnnualSalary } from '@/src/state/user-inputs';
import React from 'react';
import { Card, List, Paragraph, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as r from '@/src/calcs/rounding';

const HybridSplitOutput: React.FC = () => {
  const result = useCalculation();
  const { notAdjusted, adjusted } = result.hybridSplits;
  const currentSalary = useSelector((r: RootState) => selectAnnualSalary(r));
  const currentInofficeDays = useSelector(
    (r: RootState) => r.userInputs.daysPerWeekInOffice,
  );

  return (
    <Card>
      <Card.Content>
        <Title>Impact of In-Office Days</Title>
        <Paragraph>
          You currently spent {currentInofficeDays} days in the office.
        </Paragraph>
        <Paragraph>
          If your employer changes the number of days your have to spend in the
          office without any adjustments, this is how it impacts your hourly
          pay:
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
        <Paragraph>
          If you wanted to maintain your current standard of living with your
          salary of {r.financial.annual(currentSalary)}, then you would ask for
          this salary from your employer depending how many days of the week you
          are in the office.
        </Paragraph>
        <List.Section>
          {adjusted.map((a, index) => (
            <List.Item
              key={index}
              title={`${index + 1} days onsite`}
              description={`${r.financial.annual(a)}`}
            />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
};

export default HybridSplitOutput;
