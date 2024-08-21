/**
 * Calculate the total working hours per year.
 * @param ui The user inputs
 * @param onsiteDays The number of working days per year
 */
export const annualCommuteHours = (
  ui: {
    commuteDoorToDoorMinutes: number;
  },
  onsiteDays: number,
  hasOvernights: boolean,
  workingWeeks: number,
) => {
  const commuteHours = (2 * ui.commuteDoorToDoorMinutes) / 60;
  return (hasOvernights ? workingWeeks : onsiteDays) * commuteHours;
};

const DEFAULT_HOURS_PER_DAY = 8;

/**
 * Calculate the total working hours per year.
 * @param ui The user inputs
 * @param workingDays The number of working days per year
 */
export const annualWorkingHours = (
  ui: {
    hoursOfWorkPerDay?: number;
  },
  workingDays: number,
) => {
  const hoursPerDay = ui.hoursOfWorkPerDay || DEFAULT_HOURS_PER_DAY;
  return hoursPerDay * workingDays;
};

/**
 * Calculate the total working hours per year, including commute.
 * @param ui The user inputs
 * @param workingDays The number of working days per year
 */
export const workingHours = (
  ui: {
    hoursOfWorkPerDay: number;
    commuteDoorToDoorMinutes: number;
  },
  workingDays: number,
  onsiteDays: number,
  hasOvernights: boolean,
  workingWeeks: number,
) =>
  annualWorkingHours(ui, workingDays) +
  annualCommuteHours(ui, onsiteDays, hasOvernights, workingWeeks);

export default workingHours;
