import * as c from './constants';
import calculateAdjustedPersonalAllowance from './personal-allowance';

export const calculateBasicRateTax = (taxableIncome: number): number => {
  const aboveBasicRate = Math.min(taxableIncome, c.HIGHER_RATE_THRESHOLD);
  return aboveBasicRate > 0 ? aboveBasicRate * c.BASIC_RATE_TAX : 0;
};

export const calculateHigherRateTax = (annualSalary: number): number => {
  const aboveHigherRate =
    Math.min(annualSalary, c.ADDITIONAL_RATE_THRESHOLD) -
    c.HIGHER_RATE_THRESHOLD;
  return aboveHigherRate > 0 ? aboveHigherRate * c.HIGHER_RATE_TAX : 0;
};

export const calculateAdditionalRateTax = (annualSalary: number): number => {
  const aboveAdditionalRate = annualSalary - c.ADDITIONAL_RATE_THRESHOLD;
  return aboveAdditionalRate > 0
    ? aboveAdditionalRate * c.ADDITIONAL_RATE_TAX
    : 0;
};

export const calculateTaxableIncome = (annualSalary: number): number =>
  Math.max(0, annualSalary - calculateAdjustedPersonalAllowance(annualSalary));

/**
 *  Calculate the annual tax based on the user inputs
 * @param ui - the user inputs
 * @returns the annual tax in £
 */
export const calculateAnnualIncomeTax = (annualSalary: number): number => {
  let annualTax = 0;

  const taxableIncome = calculateTaxableIncome(annualSalary);

  annualTax += calculateBasicRateTax(taxableIncome);
  annualTax += calculateHigherRateTax(annualSalary);
  annualTax += calculateAdditionalRateTax(annualSalary);
  return annualTax;
};

export default calculateAnnualIncomeTax;
