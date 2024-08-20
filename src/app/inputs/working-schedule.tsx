import React from 'react';
import { PageHeader } from '@/src/nav';
import WorkingsScheduleInputs from '@/src/components/form-inputs/working-schedule';

const HoursScreen = () => {
  return (
    <>
      <PageHeader title="Working Schedule" />
      <WorkingsScheduleInputs />;
    </>
  );
};

export default HoursScreen;
