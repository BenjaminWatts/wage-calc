const TAXFREE_REBATE_LIMIT = 2000;

const TERM_WEEKS_PER_YEAR = 39;

const hoursOfWorkPerDay = (ui: UserInputs) => ui.hoursOfWorkPerDay || 8;

/**
 * Calculate the number of hours of free childcare available for a child
 */
const hoursOfFreeChildcare = (c: Child, parentEligible: boolean) => {
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

const INCOME_TAX_REBATE = 0.25;

/**
 * Calculate the total cost of childcare for a child in a year
 * @param ui - the user inputs
 * @param child - the child
 * @param hoursPerWeek - the number of hours of childcare required each week
 * @param parentEligible - whether the parent is eligible for government support with childcare costs
 * @returns the total annual cost of childcare for the child
 */
const child = (
  ui: UserInputs,
  child: Child,
  hoursPerWeek: number,
  holidayWeeks: number,
  parentEligible: boolean,
): number => {
  let total = 0;

  const freeHours = hoursOfFreeChildcare(child, parentEligible);
  const paidHours = hoursPerWeek - freeHours;

  if (ui.hourlyTermtimeChildcareCost) {
    total += ui.hourlyTermtimeChildcareCost * paidHours * TERM_WEEKS_PER_YEAR;
  }

  if (ui.hourlyHolidayChildcareCost) {
    // note support does not extend to holiday childcare
    total += ui.hourlyHolidayChildcareCost * hoursPerWeek * holidayWeeks;
  }

  if (ui.wraparoundChildcareCost && ui.daysPerWeekInOffice) {
    total +=
      ui.wraparoundChildcareCost * ui.daysPerWeekInOffice * TERM_WEEKS_PER_YEAR;
  }

  const taxRebate = parentEligible
    ? Math.min(total * INCOME_TAX_REBATE, TAXFREE_REBATE_LIMIT)
    : 0;

  return total - taxRebate;
};

/**
 * Calculate the number of hours of childcare required each week
 */
const calcHoursPerWeek = (ui: UserInputs) => {
  return hoursOfWorkPerDay(ui) * ui.daysPerWeekOfWorking;
};

const PUBLIC_HOLIDAYS = 8;

const fteFraction = (ui: UserInputs) => {
  if (!ui.daysPerWeekOfWorking) return 1;
  return ui.daysPerWeekOfWorking / 5;
};

const holidayDaysPerYear = (ui: UserInputs) =>
  (ui.holidayDaysPerYear || 25) * fteFraction(ui);

/**
 * Calculate the number of weeks of the year when childcare is required
 * Subtract out public and assume the parent takes all available holiday during school holidays
 */
const calcHolidayWeeks = (ui: UserInputs) => {
  let totalDays = TERM_WEEKS_PER_YEAR * 5;
  totalDays -= PUBLIC_HOLIDAYS;
  totalDays -= holidayDaysPerYear(ui);
  totalDays = totalDays * fteFraction(ui);
  const totalWeeks = totalDays / 5;
  return totalWeeks;
};

const MAX_INCOME = 100000;

/**
 * Determine whether parents are eligible for government support with childcare costs
 */
const calcParentEligible = (ui: UserInputs): boolean => {
  let parentalIncomes: number[] = [ui.annualSalary];
  if (ui.partnerAnnualIncome) parentalIncomes.push(ui.partnerAnnualIncome);
  return Math.max(...parentalIncomes) < MAX_INCOME;
};

/**
 * Calculate the total cost of childcare for all children
 */
const childcare = (ui: UserInputs) => {
  let total = 0;
  const hoursPerWeek = calcHoursPerWeek(ui);
  const holidayWeeks = calcHolidayWeeks(ui);
  const parentEligible = calcParentEligible(ui);
  for (const c of ui.children) {
    total += child(ui, c, hoursPerWeek, holidayWeeks, parentEligible);
  }
  return total;
};

export default childcare;
