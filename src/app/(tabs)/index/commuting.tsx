import React from 'react';
import { PageHeader } from '@/src/nav';
import CommutingInputs from '@/src/components/inputs/commuting';

const CommutingInputsScreen: React.FC = () => {
  return (
    <>
      <PageHeader title="Commuting Expenses" />
      <CommutingInputs />
    </>
  );
};

export default CommutingInputsScreen;
