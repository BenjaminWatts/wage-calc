// analyse how much better off an individual could be as a contractor, compared to an employee
import {
  CONTRACTOR_NI_CLASS2_THRESHOLD,
  FLAT_RATE_VAT,
  FLAT_RATE_VAT_LIMIT,
  EMPLOYEE_HIGHER_NI_RATE,
  EMPLOYEE_NI_HIGHER_RATE_THRESHOLD,
  ANNUAL_PENSION_LIMIT,
  EMPLOYEE_NI_STANDARD_RATE,
} from './constants';
import { estimateDirectEmployerPensionContribution } from './dc-pension';
import calculateAnnualIncomeTax from './take-home/tax/income-tax';
import estimateEmployerNi from './take-home/tax/ni-employer';

const calculateSelfEmployedNi = (soleTraderProfit: number): number => {
  let total = 0;
  if (soleTraderProfit > CONTRACTOR_NI_CLASS2_THRESHOLD) {
    return (total +=
      (Math.min(soleTraderProfit, EMPLOYEE_NI_HIGHER_RATE_THRESHOLD) -
        CONTRACTOR_NI_CLASS2_THRESHOLD) *
      EMPLOYEE_NI_STANDARD_RATE);
  }
  if (soleTraderProfit > EMPLOYEE_NI_HIGHER_RATE_THRESHOLD) {
    return (total +=
      (soleTraderProfit - EMPLOYEE_NI_HIGHER_RATE_THRESHOLD) *
      EMPLOYEE_HIGHER_NI_RATE);
  }
  return total;
};

/**
 * Given a particular profit, estimate the tax and NI that a sole trader would pay
 * @param soleTraderProfit - the profit of the sole trader
 * @param totalPension - the total desired pension contributions
 */
const estimateSoleTraderTaxAndNi = (soleTraderProfit: number): number =>
  calculateAnnualIncomeTax(soleTraderProfit) +
  calculateSelfEmployedNi(soleTraderProfit);

/**
 * Estimate the flat rate VAT bonus that a sole trader could receive
 * @param turnover - the turnover of the sole trader
 *
 */
const flatRateVatBonus = (turnover: number): number => {
  if (turnover > FLAT_RATE_VAT_LIMIT) return 0;
  if (turnover < 0) return 0;
  return turnover * FLAT_RATE_VAT;
};

/**
 * As a starting point for estimating a day-rate, estimate how much the employee is currently costly the employer
 * @param employee - the user inputs as an employee
 * @returns how much better off the individual could be as a contractor each year
 */
const calcTotalEmployerCost = (annualSalary: number, employerPension: number) =>
  annualSalary + estimateEmployerNi(annualSalary) + employerPension;

interface PensionTotals {
  taxDeductible: number;
  nonTaxDeductible: number;
}

/**
 * Calculate the total tax deductible (and if high enough, non tax deductible pension) that the sole trader might be able to
 * @employerPension - number the amount that in the status quo the employee is receiving from their employer
 */
export const calcPensionTotals = (
  employee: UserInputs,
  employerPension: number,
): PensionTotals => {
  // estimate how much the employee is currently contributing
  const employeePension =
    employee.employeePensionContributionPc * employee.annualSalary;

  const total = employeePension + employerPension;

  const taxDeductible = Math.min(ANNUAL_PENSION_LIMIT, total);

  const nonTaxDeductible = Math.max(0, total - taxDeductible);
  return {
    taxDeductible,
    nonTaxDeductible,
  };
};

/**
 * Calculat the take home pay of a contractor
 * @revenue - estimated revenue
 * @deductibleExpenses - travel costs etc input in the current, employee scenerio
 * @pensionTotalsa
 */
const calcContractorTakeHome = (
  revenue: number,
  deductibleExpenses: number,
  pensionTotals: PensionTotals,
) => {
  const profit =
    revenue +
    flatRateVatBonus(revenue) +
    pensionTotals.nonTaxDeductible -
    deductibleExpenses -
    pensionTotals.taxDeductible;

  const tax = estimateSoleTraderTaxAndNi(profit);

  return profit - tax;
};

/**
 * Estimate how much better off an individual could be each year, if their current employer spent the same amount on them as they do currently as an employee
 * @param employee - the user inputs as an employee
 * @returns how much better off the individual could be as a contractor each year
 */
const calculateContractorEquivalent = (
  employee: UserInputs,
  currentTakeHome: ScenarioResult,
) => {
  const employerPension = estimateDirectEmployerPensionContribution(
    employee.employerPensionContributionPc,
    employee.annualSalary,
  );

  const totalCostToEmployer = calcTotalEmployerCost(
    employee.annualSalary,
    employerPension,
  );
  const pensionTotals = calcPensionTotals(employee, employerPension);

  const deductibleExpenses = currentTakeHome.onsiteCosts; // these are all travel related

  return (
    currentTakeHome.takeHomeTotal -
    calcContractorTakeHome(
      totalCostToEmployer,
      deductibleExpenses,
      pensionTotals,
    )
  );
};

export default calculateContractorEquivalent;
