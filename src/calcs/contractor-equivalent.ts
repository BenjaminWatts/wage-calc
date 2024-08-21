// analyse how much better off an individual could be as a contractor, compared to an employee
import { SCHOOL_HOLIDAY_DAYS } from './take-home/constants';
import calculateAnnualIncomeTax from './take-home/tax/income-tax';
import estimateEmployerNi from './take-home/tax/ni-employer';

/**
 * Adjust the user inputs to represent a teacher
 */
const toContractor = (nonTeacher: UserInputs): UserInputs => {
  const teacher: UserInputs = {
    ...nonTeacher,
    annualSalary: nonTeacher.annualSalary,
    // reduce the hours of work per day
    hoursOfWorkPerDay: 32.5 / 5,
    // assume that there's no real wraparound care needed
    holidayDaysPerYear: SCHOOL_HOLIDAY_DAYS,
    // knock out the private sector pension
    employeePensionContributionPc: 0,
    employerPensionContributionPc: 0,
    employerSacrificingPension: false,
    // assume that you can drive 5 miles to work at a school and it takes 15 minutes
    drivingDistancePerCommuteMiles: 5,
    commuteDoorToDoorMinutes: 15,
    // assume that you're not paying for parking
    dailyParkingCost: 0,
    dailyTrainBusTicketCost: 0,
    flexiSeasonTicketCost: 0,
    seasonTicketCost: 0,
  };
  return teacher;
};

const CLASS_2_THRESHOLD = 6725;
const STANDARD_RATE = 0.06;
const HIGHER_THRESHOLD = 50270;
const HIGHER_RATE = 0.02;

const calculateSelfEmployedNi = (soleTraderProfit: number): number => {
  let total = 0;
  if (soleTraderProfit > CLASS_2_THRESHOLD) {
    return (total +=
      (Math.min(soleTraderProfit, HIGHER_THRESHOLD) - CLASS_2_THRESHOLD) *
      STANDARD_RATE);
  }
  if (soleTraderProfit > HIGHER_THRESHOLD) {
    return (total += (soleTraderProfit - HIGHER_THRESHOLD) * HIGHER_RATE);
  }
  return total;
};

const PENSION_LIMIT = 60000;

/**
 * Given a particular profit, estimate the tax and NI that a sole trader would pay
 * @param soleTraderProfit - the profit of the sole trader
 * @param totalPension - the total desired pension contributions
 */
const estimateSoleTraderTaxAndNi = (
  soleTraderProfit: number,
  totalPension: number,
): number => {
  const allowedPension = Math.min(totalPension, PENSION_LIMIT);
  const unusedPension = totalPension - allowedPension;
  const taxableIncome = soleTraderProfit + unusedPension;

  const incomeTax = calculateAnnualIncomeTax(taxableIncome);
  const selfEmployedNi = calculateSelfEmployedNi(soleTraderProfit);

  return incomeTax + selfEmployedNi;
};

const FLAT_RATE_VAT = 0.03;
const FLAT_RATE_VAT_LIMIT = 150000;

const flatRateVatBonus = (
  turnover: number,
  vatRate: number,
  expenses: number,
): number => {
  if (turnover > FLAT_RATE_VAT_LIMIT) return 0;
  const vat = turnover * vatRate;
  return vat - expenses;
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
  const employerNi = estimateEmployerNi(employee.annualSalary);
  const employerPension =
    employee.employerPensionContributionPc * employee.annualSalary;
  const totalCostToEmployer =
    employee.annualSalary + employerNi + employerPension;

  // now estimate the deductions as a contractor
  const deductibleExpenses = currentTakeHome.onsiteCosts;
  const employeePension =
    employee.employeePensionContributionPc * employee.annualSalary;

  const totalPension = employerPension + employeePension;

  const soleTraderRevenue = totalCostToEmployer;
  const vatBonus = flatRateVatBonus(
    soleTraderRevenue,
    FLAT_RATE_VAT,
    deductibleExpenses,
  );

  const soleTraderProfit = totalCostToEmployer + vatBonus - deductibleExpenses;

  const newTax = estimateSoleTraderTaxAndNi(soleTraderProfit, totalPension);

  const newTakeHome = currentTakeHome.takeHomeTotal - newTax;

  const deltaTakeHome = currentTakeHome.takeHomeTotal - newTakeHome;

  return deltaTakeHome;
};

export default calculateContractorEquivalent;
