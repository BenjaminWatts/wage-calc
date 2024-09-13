import * as c from './constants';

const calculateAdjustedPersonalAllowance = (income: number): number => {
  if (income <= 100000) {
    return c.PERSONAL_ALLOWANCE;
  } else if (income >= 125140) {
    return 0;
  } else {
    return Math.max(
      0,
      c.PERSONAL_ALLOWANCE - (income - c.PERSONAL_ALLOWANCE_START) / 2,
    );
  }
};

export default calculateAdjustedPersonalAllowance;
