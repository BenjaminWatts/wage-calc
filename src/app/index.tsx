import React from 'react';
import Outputs from '@/src/components/outputs';
import InputsButtons from './inputs';

export const HomeScreen: React.FC = () => {
  return (
    <>
      <InputsButtons />
      <Outputs />
    </>
  );
};
export default HomeScreen;
