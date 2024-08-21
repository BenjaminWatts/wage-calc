import PensionSalaryInputs from '@/src/components/inputs/salary-pension';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';
import React from 'react';

const SalaryScreen: React.FC = () => {
  return (
    <WithHourlyRateHeaderRight>
      <PensionSalaryInputs />
    </WithHourlyRateHeaderRight>
  );
};

export default SalaryScreen;
