import estimateDcPensionValue from '../dc-pension';
import childcare from './child-care';
import * as days from './days';
import estimateonsiteCosts, { estimateWorkingWeeks } from './onsite-costs';
import tax from './tax';
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

  const hasOvernights = ui.overnightHotelCost > 0;
  const workingWeeks = estimateWorkingWeeks(ui);

  const hours = workingHours(
    ui,
    workingDays,
    onsiteDays,
    hasOvernights,
    workingWeeks,
  );

  const schoolHolidayExcessWeeks = days.schoolHolidayExcess(workingDays);
  const childcareTotal = childcare(ui, schoolHolidayExcessWeeks);

  const onsiteCosts = estimateonsiteCosts(ui, onsiteDays, hasOvernights);

  const taxTotal = tax(ui);

  const dcPension = estimateDcPensionValue(ui);

  const takeHomePay =
    calcTakeHomePay(
      ui.annualSalary,
      taxTotal.total,
      onsiteCosts,
      childcareTotal,
    ) + dcPension;

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
