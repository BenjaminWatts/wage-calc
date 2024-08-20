import PensionSalaryInputs from '@/src/components/form-inputs/salary-pension';
import { PageHeader } from '@/src/nav';
import React from 'react';

const SalaryScreen: React.FC = () => {
  return (
    <>
      <PageHeader title="Salary and Pension" />
      <PensionSalaryInputs />
    </>
  );
};

export default SalaryScreen;
