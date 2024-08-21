import React from 'react';
import Inputs from '@/src/components/inputs';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';

const InputsScreen: React.FC = () => {
  return (
    <WithHourlyRateHeaderRight>
      <Inputs />
    </WithHourlyRateHeaderRight>
  );
};

export default InputsScreen;
