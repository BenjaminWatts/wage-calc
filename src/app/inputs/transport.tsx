import React from 'react';

import TransportInputs from '@/src/components/form-inputs/transport';
import { PageHeader } from '@/src/nav';

const Transport = () => {
  return (
    <>
      <PageHeader title="Commuting Expenses" />
      <TransportInputs />
    </>
  );
};

export default Transport;
