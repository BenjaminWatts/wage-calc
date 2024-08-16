
/**
 * Calculate the total working hours per year.
 * @param ui The user inputs
 * @param workingDays The number of working days per year
 */
const annualCommuteHours = (ui: UserInputs, workingDays: number) => {
  if (!ui.commuteDoorToDoorMinutes) return 0;
  return (ui.commuteDoorToDoorMinutes / 60) * workingDays;
};

const DEFAULT_HOURS_PER_DAY = 8;

/**
 * Calculate the total working hours per year.
 * @param ui The user inputs
 * @param workingDays The number of working days per year
 */
const annualWorkingHours = (ui: UserInputs, workingDays: number) => {
  const hoursPerDay = ui.hoursOfWorkPerDay || DEFAULT_HOURS_PER_DAY;
  return hoursPerDay * workingDays;
};

/**
 * Calculate the total working hours per year, including commute.
 * @param ui The user inputs
 * @param workingDays The number of working days per year
 */
export const workingHours = (ui: UserInputs, workingDays: number) =>
  annualWorkingHours(ui, workingDays) + annualCommuteHours(ui, workingDays);

export default workingHours;