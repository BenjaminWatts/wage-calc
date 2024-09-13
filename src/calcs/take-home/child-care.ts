import * as c from '../constants';
import { TERM_WEEKS_PER_YEAR } from './constants';

/**
 * Calculate the number of hours of free childcare available for a child
 * @param Child
 */
export const hoursOfFreeChildcare = (
  { years, months }: Child,
  parentEligible: boolean,
) => {
  if (years >= c.SCHOOL_AGE_YEARS) return c.SCHOOL_WEEK_LENGTH;

  if (!parentEligible) return 0;
  // if below 9 months, no free childcare
  if (years === 0 && months < 9) return 0;
  // if 9 months to 2 years, 15 hours
  if (years < 2) return 15;
  // if 2 to 4 years, 30 hours
  if (years < c.SCHOOL_AGE_YEARS) return 30;

  return 0;
};

export const hourlyHolidayChildcareCost = (
  hourlyHolidayChildcareCost: number,
  daysPerWeekOfWorking: number,
  holidayWeeks: number,
) => hourlyHolidayChildcareCost * daysPerWeekOfWorking * holidayWeeks;

export const calculatePaidHours = (hoursPerWeek: number, freeHours: number) =>
  Math.max(0, hoursPerWeek - freeHours);

export const calculateHourlyTermtimeCost = (
  hourlyTermtimeChildcareCost: number,
  paidHours: number,
) => hourlyTermtimeChildcareCost * paidHours * TERM_WEEKS_PER_YEAR;

export const calculateTaxRebate = (
  parentEligible: boolean,
  totalCost: number,
) => {
  return parentEligible
    ? Math.min(
        totalCost * c.INCOME_TAX_REBATE,
        c.TAXFREE_REBATE_LIMIT_PER_CHILD_ANNUAL,
      )
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
    daysPerWeekInOffice: number;
    daysPerWeekOfWorking: number;
  },
  child: Child,
  hoursPerWeek: number,
  schoolHolidayExcessWeeks: number,
  parentEligible: boolean,
): number => {
  if (child.years >= c.NO_CHILDCARE_COST_MINIMUM_AGE) return 0;

  let total = 0;

  const freeHours = hoursOfFreeChildcare(child, parentEligible);
  const paidHours = calculatePaidHours(hoursPerWeek, freeHours);

  const termTimeCost = calculateHourlyTermtimeCost(
    child.hourlyTermtimeChildcareCost,
    paidHours,
  );

  total += termTimeCost;

  const holidayCost = hourlyHolidayChildcareCost(
    child.hourlyHolidayChildcareCost,
    ui.daysPerWeekOfWorking,
    schoolHolidayExcessWeeks,
  );

  total += holidayCost;

  const taxRebate = calculateTaxRebate(parentEligible, total);

  const netChildCost = total - taxRebate;

  return netChildCost;
};

export const calcCommuteHoursPerDay = (commuteDoorToDoorMinutes: number) =>
  2 * (commuteDoorToDoorMinutes / 60);

export const calcCommuteHoursPerWeek = (
  commuteDoorToDoorMinutes: number,
  daysPerWeekInOffice: number,
) => calcCommuteHoursPerDay(commuteDoorToDoorMinutes) * daysPerWeekInOffice;

export const calcWorkHoursPerWeek = (
  hoursOfWorkPerDay: number,
  daysPerWeekOfWorking: number,
) => hoursOfWorkPerDay * daysPerWeekOfWorking;

export const calcHoursPerWeek = (
  hoursOfWorkPerDay: number,
  daysPerWeekOfWorking: number,
  daysPerWeekInOffice: number,
  commuteDoorToDoorMinutes: number,
) =>
  calcCommuteHoursPerWeek(commuteDoorToDoorMinutes, daysPerWeekInOffice) +
  calcWorkHoursPerWeek(hoursOfWorkPerDay, daysPerWeekOfWorking);

/**
 * Calculates the FTE fraction relative to the standard assumption of 5 working days per week
 * @param daysPerWeekOfWorking - days of work per week
 */
export const fteFraction = (daysPerWeekOfWorking: number) =>
  Math.max(0, Math.min(daysPerWeekOfWorking / 5, 1));

/**
 * Calculate paid holiday days per year, accounting for the FTE fraction
 * @param holidayDaysPerYear - as FTE equivalnt
 * @param daysPerWeekOfWorking
 *
 */
export const calculateHolidayDaysPerYear = (
  holidayDaysPerYear: number,
  daysPerWeekOfWorking: number,
) => holidayDaysPerYear * fteFraction(daysPerWeekOfWorking);

const MAX_INCOME = 100000;
const MIN_INCOME = 2380 * 12;

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
  if (Math.max(...parentalIncomes) > MAX_INCOME) return false;
  if (Math.min(...parentalIncomes) < MIN_INCOME) return false;
  return true;
};

interface ChildUiOptions {
  children: Child[];
  daysPerWeekInOffice: number;
  hoursOfWorkPerDay: number;
  daysPerWeekOfWorking: number;
  holidayDaysPerYear: number;
  annualSalary: number;
  partnerAnnualIncome?: number;
  commuteDoorToDoorMinutes: number;
}

/**
 * Calculate the total cost of childcare for all children
 */
const childcare = (ui: ChildUiOptions, schoolHolidayExcessWeeks: number) => {
  let total = 0;
  const hoursPerWeek = calcHoursPerWeek(
    ui.hoursOfWorkPerDay,
    ui.daysPerWeekOfWorking,
    ui.daysPerWeekInOffice,
    ui.commuteDoorToDoorMinutes,
  );
  const parentEligible = calcParentEligible(
    ui.annualSalary,
    ui.partnerAnnualIncome,
  );
  for (const c of ui.children) {
    total += child(
      ui,
      c,
      hoursPerWeek,
      schoolHolidayExcessWeeks,
      parentEligible,
    );
  }
  return total;
};

export default childcare;
