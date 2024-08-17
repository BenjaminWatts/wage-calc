const CHILD_BENEFIT_PER_CHILD = 2100;
const LOWER_LIMIT = 60000;
const UPPER_LIMIT = 50000;

/**
 * Calculate the fraction of the child benefit charge that is due
 * @param ui - the user inputs
 * @returns the fraction of the child benefit charge that is due as a decimal
 */
const calculateChargeFraction = (highestIncome: number): number => {
  if (highestIncome <= LOWER_LIMIT) {
    return 0;
  } else if (highestIncome >= UPPER_LIMIT) {
    return 1;
  } else {
    return (highestIncome - LOWER_LIMIT) / (UPPER_LIMIT - LOWER_LIMIT);
  }
};

/**
 * Calculate whether a high income child benefit charge is due
 * @param ui - the user inputs
 * @returns the child benefit charge in £
 */
export const calculateChildBenefitCharge = (ui: UserInputs): number => {
  const highestIncome = Math.max(ui.annualSalary, ui.partnerAnnualIncome || 0);
  const chargeFraction = calculateChargeFraction(highestIncome);
  const count = ui.children.length;
  const charge = CHILD_BENEFIT_PER_CHILD * chargeFraction * count;
  return charge;
};

export default calculateChildBenefitCharge;
