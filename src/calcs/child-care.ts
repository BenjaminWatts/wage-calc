import { TERM_WEEKS_PER_YEAR } from './constants';

const TAXFREE_REBATE_LIMIT = 2000;

/**
 * Calculate the number of hours of free childcare available for a child
 */
export const hoursOfFreeChildcare = (c: Child, parentEligible: boolean) => {
  if (!parentEligible) return 0;
  // if below 9 months, no free childcare
  if (c.years === 0 && c.months < 9) return 0;
  // if 9 months to 2 years, 15 hours
  if (c.years < 2) return 15;
  // if 2 to 4 years, 30 hours
  if (c.years < 5) return 30;
  // if school age - none
  return 0;
};

export const hourlyHolidayChildcareCost = (
  hourlyHolidayChildcareCost: number,
  daysPerWeekOfWorking: number,
  holidayWeeks: number,
) => hourlyHolidayChildcareCost * daysPerWeekOfWorking * holidayWeeks;

const wraparoundChildcareCost = (
  wraparoundChildcareCost: number,
  daysPerWeekInOffice: number,
) => wraparoundChildcareCost * daysPerWeekInOffice * TERM_WEEKS_PER_YEAR;

const INCOME_TAX_REBATE = 0.25;

export const calculatePaidHours = (hoursPerWeek: number, freeHours: number) =>
  hoursPerWeek - freeHours;

export const calculateHourlyTermtimeCost = (
  hourlyTermtimeChildcareCost: number,
  paidHours: number,
) => hourlyTermtimeChildcareCost * paidHours * TERM_WEEKS_PER_YEAR;

export const calculateTaxRebate = (
  parentEligible: boolean,
  totalCost: number,
) => {
  return parentEligible
    ? Math.min(totalCost * INCOME_TAX_REBATE, TAXFREE_REBATE_LIMIT)
    : 0;
};

/**
 * Calculate the total cost of childcare for a child in a year
 * @param ui - the user inputs
 * @param child - the child
 * @param hoursPerWeek - the number of hours of childcare required each week
 * @param parentEligible - whether the parent is eligible for government support with childcare costs
 * @returns the total annual cost of childcare for the child
 */
export const child = (
  ui: {
    hourlyTermtimeChildcareCost: number;
    hourlyHolidayChildcareCost: number;
    wraparoundChildcareCost: number;
    daysPerWeekInOffice: number;
    daysPerWeekOfWorking: number;
  },
  child: Child,
  hoursPerWeek: number,
  holidayWeeks: number,
  parentEligible: boolean,
): number => {
  let total = 0;

  const freeHours = hoursOfFreeChildcare(child, parentEligible);
  const paidHours = calculatePaidHours(hoursPerWeek, freeHours);

  if (ui.hourlyTermtimeChildcareCost) {
    total += calculateHourlyTermtimeCost(
      ui.hourlyTermtimeChildcareCost,
      paidHours,
    );
  }

  if (ui.hourlyHolidayChildcareCost) {
    total += hourlyHolidayChildcareCost(
      ui.hourlyHolidayChildcareCost,
      ui.daysPerWeekOfWorking,
      holidayWeeks,
    );
  }

  if (ui.wraparoundChildcareCost && ui.daysPerWeekInOffice) {
    total += wraparoundChildcareCost(
      ui.wraparoundChildcareCost,
      ui.daysPerWeekInOffice,
    );
  }

  const taxRebate = calculateTaxRebate(parentEligible, total);

  return total - taxRebate;
};

/**
 * Calculate the number of hours of childcare required each week
 */
export const calcHoursPerWeek = (
  hoursOfWorkPerDay: number,
  daysPerWeekOfWorking: number,
) => hoursOfWorkPerDay * daysPerWeekOfWorking;

const PUBLIC_HOLIDAYS = 8;

export const fteFraction = (daysPerWeekOfWorking: number) => {
  return daysPerWeekOfWorking / 5;
};

export const calculateHolidayDaysPerYear = (
  holidayDaysPerYear: number,
  daysPerWeekOfWorking: number,
) => (holidayDaysPerYear || 25) * fteFraction(daysPerWeekOfWorking);

/**
 * Calculate the number of weeks of the year when childcare is required
 * Subtract out public and assume the parent takes all available holiday during school holidays
 */
export const calcHolidayWeeks = (
  holidayDaysPerYear: number,
  daysPerWeekOfWorking: number,
) => {
  let totalDays = TERM_WEEKS_PER_YEAR * 5;
  totalDays -= PUBLIC_HOLIDAYS;
  totalDays -= calculateHolidayDaysPerYear(
    holidayDaysPerYear,
    daysPerWeekOfWorking,
  );
  totalDays = totalDays * fteFraction(daysPerWeekOfWorking);
  const totalWeeks = totalDays / 5;
  return totalWeeks;
};

const MAX_INCOME = 100000;

/**
 * Determine whether parents are eligible for government support with childcare costs
 * @param ui - the user inputs
 * @returns whether the parent is eligible for government support with childcare costs
 */
export const calcParentEligible = (
  annualSalary: number,
  partnerAnnualIncome?: number,
): boolean => {
  let parentalIncomes: number[] = [annualSalary];
  if (partnerAnnualIncome) parentalIncomes.push(partnerAnnualIncome);
  return Math.max(...parentalIncomes) < MAX_INCOME;
};

interface ChildUiOptions {
  children: Child[];
  hourlyTermtimeChildcareCost: number;
  hourlyHolidayChildcareCost: number;
  wraparoundChildcareCost: number;
  daysPerWeekInOffice: number;
  hoursOfWorkPerDay: number;
  daysPerWeekOfWorking: number;
  holidayDaysPerYear: number;
  annualSalary: number;
  partnerAnnualIncome?: number;
}

/**
 * Calculate the total cost of childcare for all children
 */
const childcare = (ui: ChildUiOptions) => {
  let total = 0;
  const hoursPerWeek = calcHoursPerWeek(
    ui.hoursOfWorkPerDay,
    ui.daysPerWeekOfWorking,
  );
  const holidayWeeks = calcHolidayWeeks(
    ui.holidayDaysPerYear,
    ui.daysPerWeekOfWorking,
  );
  const parentEligible = calcParentEligible(
    ui.annualSalary,
    ui.partnerAnnualIncome,
  );
  for (const c of ui.children) {
    total += child(ui, c, hoursPerWeek, holidayWeeks, parentEligible);
  }
  return total;
};

export default childcare;
