// analyse what teacher salary would be required, to result in the same take-home pay as a teacher with a given salary and childcare costs
import { BASIC_RATE_INCOMETAX } from './constants';

const RETIREMENT_AGE = 65;
const RETIREMENT_LENGTH_YEARS = 23;
const ACCRUED_PENSION_PER_YEAR = 1 / 57;
const DISCOUNT_RATE = 0.03;

/**
 * Estimate the net present value of the teacher's pension
 * @param currentAge - the teacher's current age
 * @param annualPension - the teacher's annual pension after tax that they will receive in retirement
 */
export const estimateNPVOfTeacherPension = (
  currentAge: number,
  annualPension: number,
) => {
  const yearsUntilRetirement = RETIREMENT_AGE - currentAge;
  const pensionValue =
    annualPension / Math.pow(1 + DISCOUNT_RATE, yearsUntilRetirement);
  return pensionValue;
};

/**
 * Estimate the value of a teacher's pension based on their annual salary
 * @param annualSalary - the teacher's annual salary
 * @param currentAge - the teacher's current age
 */
export const estimateTeacherPensionValue = (
  annualSalary: number,
  currentAge: number,
) => {
  const annualPensionBeforeTax =
    annualSalary * ACCRUED_PENSION_PER_YEAR * RETIREMENT_LENGTH_YEARS;
  const annualPensionAfterTax =
    annualPensionBeforeTax * (1 - BASIC_RATE_INCOMETAX);
  const npv = estimateNPVOfTeacherPension(currentAge, annualPensionAfterTax);
  return npv;
};

/**
 * Estimate the equivalent teacher salary required to result in the same take-home pay as a teacher with a given salary and childcare costs
 */
const teacherEquivalent = (uI: UserInputs) => {};
