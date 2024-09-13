import {
  UK_STATUTORY_HOLIDAY_COUNT,
  WEEKS_IN_YEAR,
  UK_BANK_HOLIDAY_COUNT,
} from '../constants';
import { SCHOOL_WORKING_DAYS } from './constants';

/**
 * Calculate the annual leave days
 * @param ui The user inputs
 */
export const minimumAnnualLeave = (workingDaysPerWeek: number): number =>
  Math.ceil((workingDaysPerWeek / 5) * UK_STATUTORY_HOLIDAY_COUNT);

/**
 * Calculate the number of days that the user is onsite
 * @param ui The user inputs
 * @returns The number of days that the user is onsite
 */
export const onsiteDays = (
  ui: {
    daysPerWeekInOffice?: number;
    daysPerWeekOfWorking: number;
  },
  workingDays: number,
): number => {
  if (!ui.daysPerWeekInOffice) return 0;
  const onsiteFraction = ui.daysPerWeekInOffice / ui.daysPerWeekOfWorking;
  return onsiteFraction * workingDays;
};

/**
 * Calculate the number of working days in a year
 */
export const workingDays = (userInputs: {
  daysPerWeekOfWorking: number;
  holidayDaysPerYear?: number;
}): number => {
  const totalWorkingDays = userInputs.daysPerWeekOfWorking * WEEKS_IN_YEAR;
  const totalHolidays =
    userInputs.holidayDaysPerYear ||
    UK_STATUTORY_HOLIDAY_COUNT + UK_BANK_HOLIDAY_COUNT;
  return totalWorkingDays - totalHolidays;
};

/**
 * Calculate the number of days when the parents are off work and the children are not in school
 * @param workingDays The number of working days in a year that the parents have
 */
export const schoolHolidayExcess = (workingDays: number): number =>
  Math.max(0, workingDays - SCHOOL_WORKING_DAYS);
