// a component to describe to the user what marginal tax-rates are, and how they affect payrises and bonuses

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';

const MarginalTaxRatesBonuses: React.FC = () => {
  const result = useCalculation();
  const { marginalRate, total } = result.takeHome.tax;

  return (
    <Card>
      <Card.Content>
        <Paragraph>
          In your current situation, we have calculated that you pay a total of{' '}
          {r.financial.annual(total)} in tax. This includes the standard Income
          Tax (and National Insurance) you pay on your salary, but also includes
          any penalties from the Government to the help you get with raising
          your family, including the High Income Child Benefit Charge, and for
          the highest earners, the withdrawal of tax-free and free childcare.
        </Paragraph>
        <Paragraph>
          Marginal tax rates are the rates of tax you pay on the next pound you
          earn. They are important because they determine how much of a payrise
          or bonus you get to keep after tax. This is why it is important to
          know your marginal tax rate when negotiating a payrise or bonus.
        </Paragraph>
        <Paragraph>
          Crunching the numbers, we have calculated that your marginal tax rate
          is {r.percentage(marginalRate)}. So, if you get a payrise or bonus of
          £1, you will keep {r.financial.pennies(1 - marginalRate)} after tax.
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default MarginalTaxRatesBonuses;
