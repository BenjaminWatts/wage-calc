import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import React from 'react';
import calculate from './calcs';
import { captureException } from './utils/sentry';

/**
 * A hook that extracts the user-input and calculates an updated output
 */
export const useCalculation = () => {
  const ui = useSelector((state: RootState) => state.userInputs);
  const result = React.useMemo(() => {
    try {
      return calculate(ui);
    } catch (e) {
      captureException(e as Error);
      return null;
    }
  }, [ui]);
  return result;
};
