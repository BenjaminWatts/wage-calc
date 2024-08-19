// render summary of the outputs

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';

const SummaryOutputs: React.FC = () => {
  const result = useCalculation();
  const { takeHome } = result;
  // render a summary of the outputs

  return (
    <Card>
      <Card.Content>
        {/* <Title>Current Take Home Income</Title> */}
        <Paragraph>
          Your current take home income is{' '}
          {r.financial.annual(takeHome.takeHomeTotal)}. This is the total you
          keep after paying taxes {r.financial.annual(takeHome.tax.total)},
          childcare {r.financial.annual(takeHome.childcareTotal)} and other
          commuting costs {r.financial.annual(takeHome.onsiteCosts)} such as
          commuting, eating out and dog walking.
        </Paragraph>
        <Paragraph>
          Your total working hours, including commute, are{' '}
          {r.hours.annual(takeHome.workingAndCommutingHours)} hours. This means
          that, for each hour you get take home pay of approximately{' '}
          {r.financial.hourly(takeHome.takeHomeTotal)}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default SummaryOutputs;
