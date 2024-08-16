import childBenefit from "./child-benefit";

// tax thresholds
const BASIC_RATE = 37500;

// tax thresholds
const PERSONAL_ALLOWANCE = 12500;
const HIGHER_RATE = 50000;
const ADDITIONAL_RATE = 150000;

// tax rates
const BASIC_RATE_TAX = 0.2;
const HIGHER_RATE_TAX = 0.4;
const ADDITIONAL_RATE_TAX = 0.45;

// calculate tax

/**
 *  Calculate the annual tax based on the user inputs
 * @param ui - the user inputs
 * @returns the annual tax in £
 */
const calculateAnnualIncomeTax = (ui: UserInputs): number => {
  // calculate the annual tax based on the user inputs
  let annualTax = 0;
  if (ui.annualSalary > ADDITIONAL_RATE) {
    annualTax =
      (ui.annualSalary - ADDITIONAL_RATE) * ADDITIONAL_RATE_TAX +
      (ADDITIONAL_RATE - HIGHER_RATE) * HIGHER_RATE_TAX +
      (HIGHER_RATE - BASIC_RATE) * BASIC_RATE_TAX;
  } else if (ui.annualSalary > HIGHER_RATE) {
    annualTax =
      (ui.annualSalary - HIGHER_RATE) * HIGHER_RATE_TAX +
      (HIGHER_RATE - BASIC_RATE) * BASIC_RATE_TAX;
  } else if (ui.annualSalary > BASIC_RATE) {
    annualTax = (ui.annualSalary - BASIC_RATE) * BASIC_RATE_TAX;
  }
  return annualTax;
};

// calculate NI

// NI thresholds

const NI_PRIMARY_THRESHOLD = 9500;
const NI_UPPER_THRESHOLD = 50000;
const NI_ADDITIONAL_THRESHOLD = 50000;

/**
 *
 * @param ui - the user inputs
 * @returns the annual employer NI in £
 */
const calculateAnnualEmployerNI = (ui: UserInputs): number => {
  // calculate the annual employer NI based on the user inputs
  let annualEmployerNI = 0;
  if (ui.annualSalary > NI_ADDITIONAL_THRESHOLD) {
    annualEmployerNI =
      (ui.annualSalary - NI_ADDITIONAL_THRESHOLD) * 0.02 +
      (NI_ADDITIONAL_THRESHOLD - NI_UPPER_THRESHOLD) * 0.12 +
      (NI_UPPER_THRESHOLD - NI_PRIMARY_THRESHOLD) * 0.138;
  } else if (ui.annualSalary > NI_UPPER_THRESHOLD) {
    annualEmployerNI =
      (ui.annualSalary - NI_UPPER_THRESHOLD) * 0.12 +
      (NI_UPPER_THRESHOLD - NI_PRIMARY_THRESHOLD) * 0.138;
  } else if (ui.annualSalary > NI_PRIMARY_THRESHOLD) {
    annualEmployerNI = (ui.annualSalary - NI_PRIMARY_THRESHOLD) * 0.138;
  }
  return annualEmployerNI;
};

/**
 * Calculate total tax and NI
 * @param ui - the user inputs
 * @returns the annual employee NI in £
 */
const calculateTotalTaxAndNI = (ui: UserInputs): number => {
  const annualIncomeTax = calculateAnnualIncomeTax(ui);
  const annualEmployerNI = calculateAnnualEmployerNI(ui);
  const childBenefitCharge = childBenefit(ui);
  return annualIncomeTax + annualEmployerNI + childBenefitCharge;
};

export default calculateTotalTaxAndNI;
