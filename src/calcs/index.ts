import childcare from './child-care';
import * as days from './days';
import tax from './tax';
import workingCosts from './onsite-costs';
import workingHours from './working-hours';

interface Results {
  takeHomePay: number;
  taxTotal: number;
  childcareTotal: number;
  workingAndCommutingHours: number;
  netHourlyPay: number;
  // teacherEquivalentSalary: number
}

/**
 * Calculate the hourly pay based on the user inputs
 */
const calc = (ui: UserInputs): Results => {
  const workingDays = days.workingDays(ui);
  const hours = workingHours(ui, workingDays);
  const taxTotal = tax(ui);
  const childcareTotal = childcare(ui);
  const onsiteDays = days.onsiteDays(ui, workingDays);
  const onsiteCosts = workingCosts(ui, onsiteDays);
  // calcs
  const takeHomePay = ui.annualSalary - taxTotal - onsiteCosts - childcareTotal;
  const netHourlyPay = takeHomePay / hours;

  return {
    takeHomePay,
    taxTotal,
    childcareTotal,
    workingAndCommutingHours: hours,
    netHourlyPay,
  };
};
