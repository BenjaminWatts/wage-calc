import childcare from './child-care';
import * as days from './days';
import tax from './tax';
import workingCosts from './onsite-costs';
import workingHours from './working-hours';

const calcTakeHomePay = (
  annualSalary: number,
  taxTotal: number,
  onsiteCosts: number,
  childcareTotal: number,
): number => annualSalary - taxTotal - onsiteCosts - childcareTotal;

const calcNetHourlyPay = (takeHomePay: number, hours: number): number =>
  takeHomePay / hours;

/**
 * Calculate aggregate take home pay for the year
 * @param ui - the user inputs
 * @returns the results of the calculation
 */
const calcTakeHome = (ui: UserInputs): ScenarioResult => {
  const workingDays = days.workingDays(ui);
  const onsiteDays = days.onsiteDays(ui, workingDays);
  const hours = workingHours(ui, workingDays, onsiteDays);
  const schoolHolidayExcessWeeks = days.schoolHolidayExcess(workingDays);
  const childcareTotal = childcare(ui, schoolHolidayExcessWeeks);
  const onsiteCosts = workingCosts(ui, onsiteDays);
  const taxTotal = tax(ui);

  const takeHomePay = calcTakeHomePay(
    ui.annualSalary,
    taxTotal.total,
    onsiteCosts,
    childcareTotal,
  );

  return {
    takeHomeTotal: takeHomePay,
    tax: taxTotal,
    childcareTotal,
    onsiteCosts,
    workingAndCommutingHours: hours,
    netHourlyPay: calcNetHourlyPay(takeHomePay, hours),
  };
};

export default calcTakeHome;
