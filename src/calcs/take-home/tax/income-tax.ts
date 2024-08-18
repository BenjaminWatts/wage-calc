import * as c from './constants';
import calculateAdjustedPersonalAllowance from './personal-allowance';

export const calculateBasicRateTax = (
  taxableIncome: number,
  personalAllowance: number,
): number => {
  const taxable = Math.min(
    taxableIncome - personalAllowance,
    c.HIGHER_RATE_THRESHOLD,
  );
  return taxable * c.BASIC_RATE_TAX;
};

export const calculateHigherRateTax = (
  annualSalary: number,
  personalAllowance: number,
): number => {
  const adjustedThreshold = c.HIGHER_RATE_THRESHOLD + personalAllowance;

  const capped = Math.min(annualSalary, c.ADDITIONAL_RATE_THRESHOLD);

  const aboveHigherRate = Math.max(capped - adjustedThreshold, 0);

  return aboveHigherRate * c.HIGHER_RATE_TAX;
};

export const calculateAdditionalRateTax = (annualSalary: number): number => {
  const aboveAdditionalRate = Math.max(
    annualSalary - c.ADDITIONAL_RATE_THRESHOLD,
    0,
  );
  return aboveAdditionalRate > 0
    ? aboveAdditionalRate * c.ADDITIONAL_RATE_TAX
    : 0;
};

/**
 *  Calculate the annual tax based on the user inputs
 * @param annualSalary - the user's annual salary
 * @returns the annual income tax in £
 */
export const calculateAnnualIncomeTax = (annualSalary: number): number => {
  const personalAllowance = calculateAdjustedPersonalAllowance(annualSalary);
  // const taxableIncome = Math.max(annualSalary - personalAllowance, 0);

  const basicRate = calculateBasicRateTax(annualSalary, personalAllowance);
  const higherRate = calculateHigherRateTax(annualSalary, personalAllowance);
  const additionalRate = calculateAdditionalRateTax(annualSalary);

  console.log({ basicRate, higherRate, additionalRate });

  return basicRate + higherRate + additionalRate;
};

export default calculateAnnualIncomeTax;
