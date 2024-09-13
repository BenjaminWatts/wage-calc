import React from 'react';
import { PageHeader } from '@/src/nav';
import CommutingInputs from '@/src/components/inputs/commuting';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';

const CommutingInputsScreen: React.FC = () => {
  return (
    <WithHourlyRateHeaderRight>
      <CommutingInputs />
    </WithHourlyRateHeaderRight>
  );
};

export default CommutingInputsScreen;
