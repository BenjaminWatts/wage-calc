import React from 'react';
import WorkingsScheduleInputs from '@/src/components/inputs/working-schedule';
import WithHourlyRateHeaderRight from '@/src/components/outputs/hourly-rate';

const HoursScreen = () => {
  return (
    <WithHourlyRateHeaderRight>
      <WorkingsScheduleInputs />;
    </WithHourlyRateHeaderRight>
  );
};

export default HoursScreen;
