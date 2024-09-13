// a component that renders and explains the teacher equivalent salary, along with the assumiptions we have made

import { useCalculation } from '@/src/hooks';
import React from 'react';
import { Card, Paragraph } from 'react-native-paper';
import * as r from '@/src/calcs/rounding';

const ContractorOutput: React.FC = () => {
  const result = useCalculation();
  if (!result) return null;
  const contractorPremium = result.contractor;
  return (
    <>
      <Paragraph>
        As a contractor, rather than an employee, you may be able to deduct
        subsistance and travel costs.
      </Paragraph>
      <Paragraph>
        In addition, you may be able to reclaim some VAT and pay a lower rate of
        tax.
      </Paragraph>
      <Paragraph>
        In a very simplistic setup as a contractor (being a sole trader), rather
        an incorporating a limited company, our high level calculations suggest
        that you could increase your annual take home pay by{' '}
        {r.financial.annual(contractorPremium)}.
      </Paragraph>
      <Paragraph>
        This is an incredibly simplistic view, and there are many factors to
        consider.
      </Paragraph>
    </>
  );
};

export default ContractorOutput;
