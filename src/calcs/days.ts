const DAYS_IN_YEAR = 365;
const WEEKS_IN_YEAR = DAYS_IN_YEAR / 7;
const UK_BANK_HOLIDAY_COUNT = 8;
const UK_STATUTORY_HOLIDAY_COUNT = 28;

/**
 * Calculate the annual leave days
 * @param ui The user inputs
 */
export const annualLeave = (ui: UserInputs): number => {
  const total = ui.holidayDaysPerYear || 25;
  return total;
};

/**
 * Calculate the number of days that the user is onsite
 * @param ui The user inputs
 * @returns The number of days that the user is onsite
 */
export const onsiteDays = (ui: UserInputs, workingDays: number): number => {
  if (!ui.daysPerWeekInOffice) return 0;
  const onsiteFraction = ui.daysPerWeekInOffice / ui.daysPerWeekOfWorking;
  return onsiteFraction * workingDays;
};

/**
 * Calculate the number of working days in a year
 */
export const workingDays = (userInputs: UserInputs): number => {
  const totalWorkingDays = userInputs.daysPerWeekOfWorking * WEEKS_IN_YEAR;
  const totalHolidays =
    userInputs.holidayDaysPerYear ||
    UK_STATUTORY_HOLIDAY_COUNT + UK_BANK_HOLIDAY_COUNT;
  return totalWorkingDays - totalHolidays;
};

const SCHOOL_WORKING_DAYS = 190;

/**
 * Calculate the number of days when the parents are off work and the children are not in school
 * @param workingDays The number of working days in a year that the parents have
 */
export const schoolHoliday = (workingDays: number): number =>
  DAYS_IN_YEAR - workingDays - SCHOOL_WORKING_DAYS;
