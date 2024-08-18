import childBenefit from './child-benefit';
import calculateAnnualIncomeTax from './income-tax';
import calculateAnnualEmployeeNI from './ni-employee';

/**
 * Calculate total tax and NI
 * @param ui - the user inputs
 * @returns the annual employee NI in £
 */
const calculateTotalTaxAndNI = (ui: UserInputs): number =>
  calculateAnnualIncomeTax(ui.annualSalary) +
  calculateAnnualEmployeeNI(ui.annualSalary) +
  childBenefit(ui);

export default calculateTotalTaxAndNI;
