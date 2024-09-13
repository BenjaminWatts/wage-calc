import childBenefit from './child-benefit';
import calculateAnnualIncomeTax from './income-tax';
import calculateAnnualEmployeeNI from './ni-employee';

const calculateTotalTaxAndNI = (ui: UserInputs) =>
  calculateAnnualIncomeTax(ui.annualSalary) +
  calculateAnnualEmployeeNI(ui.annualSalary) +
  childBenefit(ui);

const DELTA = 100; // vary the salary by this amount to calculate the marginal rate

const calculateMarginalTaxRate = (
  actual: number,
  plus: number,
  minus: number,
) => (plus - actual + (actual - minus)) / (2 * DELTA);

/**
 * Calculate total tax and NI
 * @param ui - the user inputs
 * @returns the total tax and NI and the marginal rate
 */
const calculateTax = (ui: UserInputs): TaxCalculationResult => {
  const actual = calculateTotalTaxAndNI(ui);
  const plus = calculateTotalTaxAndNI({
    ...ui,
    annualSalary: ui.annualSalary + DELTA,
  });
  const minus = calculateTotalTaxAndNI({
    ...ui,
    annualSalary: ui.annualSalary - DELTA,
  });
  const marginalRate = calculateMarginalTaxRate(actual, plus, minus);
  return {
    total: actual,
    marginalRate,
  };
};

export default calculateTax;
