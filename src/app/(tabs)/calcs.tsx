import React from 'react';
import Outputs from '../../components/outputs';
import WithTerms from '@/src/components/disclaimer';

const OutputsScreen: React.FC = () => (
  <WithTerms>
    <Outputs />;
  </WithTerms>
);
export default OutputsScreen;
