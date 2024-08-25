// evaluate the value of the pension arrangements of a job

import {
  BASIC_RATE_INCOMETAX,
  EMPLOYER_NI_RATE,
  EMPLOYER_NI_THRESHOLD,
} from './constants';
import calculateAnnualIncomeTax from './take-home/tax/income-tax';
import calculateNIEmployee from './take-home/tax/ni-employee';

/**
 * Estimate the value of the employer's pension contribution
 * @param uI - the user inputs
 * @returns the value of the employer's pension contribution
 */
export const estimateDirectEmployerPensionContribution = (
  employerPensionContributionPc: number,
  annualSalary: number,
) => annualSalary * employerPensionContributionPc;

/**
 * Esimate the saving in employer's national insurance contributions due to the pension contribution. This assumes the employer passes on the saving to the employee.
 * @param annualSalary - the annual salary before pension contributions
 * @param grossSacrifiedValue - the gross value of the pension contribution
 */
export const estimateEmployerKickback = (
  annualSalary: number,
  grossSacrifiedValue: number,
) => {
  if (grossSacrifiedValue <= 0) return 0;
  const salaryAboveThreshold = annualSalary - EMPLOYER_NI_THRESHOLD;
  if (salaryAboveThreshold <= 0) return 0;
  const salarySaved = Math.min(salaryAboveThreshold, grossSacrifiedValue);
  return salarySaved * EMPLOYER_NI_RATE;
};

export const estimateEmployeeIncomeTaxSavings = (
  annualSalary: number,
  grossSacrifiedValue: number,
) =>
  Math.max(
    0,
    calculateAnnualIncomeTax(annualSalary) -
      calculateAnnualIncomeTax(annualSalary - grossSacrifiedValue),
  );

/**
 * Estimate the value of the employee's national insurance savings due to the pension contribution.
 * @param beforeSalary - the annual salary before pension contributions
 * @param afterSalary - the gross value of the pension contribution from the employee
 */
export const estimateEmployeeNiSavings = (
  beforeSalary: number,
  grossSacrifiedValue: number,
) =>
  Math.max(
    0,
    calculateNIEmployee(beforeSalary) -
      calculateNIEmployee(beforeSalary - grossSacrifiedValue),
  );

/**
 * Estimate the value of the employee's pension contribution.
 * This is more complicated because we have to take into account the tax relief on pension contributions, both for income tax and national insurance.
 * We also include the employer's national insurance saving in the calculation - depending on whether they are kind enough to pass it on to the employee.
 */
export const estimateEmployeePensionValue = (uI: {
  employeePensionContributionPc: number;
  annualSalary: number;
  employerSacrificingPension: boolean;
}): number => {
  const grossSacrifiedValue =
    uI.annualSalary * uI.employeePensionContributionPc;
  const employeeIncomeTaxSavings = estimateEmployeeIncomeTaxSavings(
    uI.annualSalary,
    grossSacrifiedValue,
  );
  const employeeNiSavings = estimateEmployeeNiSavings(
    uI.annualSalary,
    grossSacrifiedValue,
  );
  const employerKickback = uI.employerSacrificingPension
    ? estimateEmployerKickback(uI.annualSalary, grossSacrifiedValue)
    : 0;
  const totalContributions =
    employeeIncomeTaxSavings +
    grossSacrifiedValue +
    employerKickback +
    employeeNiSavings;
  const afterTax = subtractTax(totalContributions);
  return afterTax;
};

/**
 * Estimate the value of the pension arrangements of a job in a particular year
 * This is a crude estimate of the value of the pension.
 * We take all the present value of contributions and deduct the basic rate of income tax - assuming that in retirement the pension will be taxed at the basic rate.
 * @param uI - the user inputs
 * @returns the value of the pension arrangements
 */
export const subtractTax = (totalContributions: number) =>
  (1 - BASIC_RATE_INCOMETAX) * totalContributions;

/**
 * Estimate the value of a DC pension arrangements of a job in a particular year
 * This is a crude estimate of the value of the pension. We add both the employer and employee contributions together.
 * We take all the present value of contributions and deduct the basic rate of income tax - assuming that in retirement the pension will be taxed at the basic rate.
 * @param uI - the user inputs
 */
const estimateDcPensionValue = (uI: {
  employerPensionContributionPc: number;
  annualSalary: number;
  employeePensionContributionPc: number;
  employerSacrificingPension: boolean;
}) => {
  const employerPensionValue = estimateDirectEmployerPensionContribution(
    uI.employerPensionContributionPc,
    uI.annualSalary,
  );
  const employeePensionValue = estimateEmployeePensionValue(uI);
  const totalContributions = employerPensionValue + employeePensionValue;
  const afterTax = subtractTax(totalContributions);
  return afterTax;
};

export default estimateDcPensionValue;
