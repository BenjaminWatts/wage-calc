const CHILD_BENEFIT_PER_CHILD = 2100;
const CHILD_BENEFIT_HIGH_INCOME_CHARGE_LOWER_LIMIT = 60000;
const CHILD_BENEFIT_HIGH_INCOME_CHARGE_HIGHER_LIMIT = 80000;

/**
 * Calculate the fraction of the child benefit charge that is due
 * @param ui - the user inputs
 * @returns the fraction of the child benefit charge that is due as a decimal
 */
export const calculateChargeFraction = (highestIncome: number): number => {
  if (highestIncome <= CHILD_BENEFIT_HIGH_INCOME_CHARGE_LOWER_LIMIT) {
    return 0;
  } else if (highestIncome >= CHILD_BENEFIT_HIGH_INCOME_CHARGE_HIGHER_LIMIT) {
    return 1;
  } else {
    return (
      (highestIncome - CHILD_BENEFIT_HIGH_INCOME_CHARGE_LOWER_LIMIT) /
      (CHILD_BENEFIT_HIGH_INCOME_CHARGE_HIGHER_LIMIT -
        CHILD_BENEFIT_HIGH_INCOME_CHARGE_LOWER_LIMIT)
    );
  }
};

/**
 * Required subset of the User Inputs needed for the child benefit calculation
 * @param annualSalary - the user's annual salary
 * @param partnerAnnualIncome - the partner's annual salary
 * @param children - the children - only the length is used
 */
interface ChildBenefitCalculationOptions {
  annualSalary: number;
  partnerAnnualIncome?: number;
  children: any[];
}

export const getHighestIncome = (ui: ChildBenefitCalculationOptions): number =>
  Math.max(ui.annualSalary, ui.partnerAnnualIncome || 0);

export const countChildren = (ui: ChildBenefitCalculationOptions): number =>
  ui.children.length;

export const calculateCharge = (chargeFraction: number, count: number) =>
  CHILD_BENEFIT_PER_CHILD * chargeFraction * count;

/**
 * Calculate whether a high income child benefit charge is due
 * @param ui - the user inputs
 * @returns the child benefit charge in £
 */
export const calculateChildBenefitCharge = (
  ui: ChildBenefitCalculationOptions,
): number => {
  const highestIncome = getHighestIncome(ui);
  const chargeFraction = calculateChargeFraction(highestIncome);
  const count = countChildren(ui);
  const charge = calculateCharge(chargeFraction, count);
  return charge;
};

export default calculateChildBenefitCharge;
