// analyse what teacher salary would be required, to result in the same take-home pay as a teacher with a given salary and childcare costs
import { BASIC_RATE_INCOMETAX } from './constants';
import salarySolver from './salary-solver';
import calcTakeHome from './take-home';
import { SCHOOL_HOLIDAY_DAYS } from './take-home/constants';

const RETIREMENT_AGE = 65;
const RETIREMENT_LENGTH_YEARS = 23;
const ACCRUED_PENSION_PER_YEAR = 1 / 57;
const DISCOUNT_RATE = 0.03;

/**
 * Estimate the net present value of the teacher's pension
 * @param currentAge - the teacher's current age
 * @param annualPension - the teacher's annual pension after tax that they will receive in retirement
 */
export const estimateNPVOfTeacherPension = (
  currentAge: number,
  annualPension: number,
) => {
  const yearsUntilRetirement = RETIREMENT_AGE - currentAge;
  const pensionValue =
    annualPension / Math.pow(1 + DISCOUNT_RATE, yearsUntilRetirement);
  return pensionValue;
};

/**
 * Estimate the value of a teacher's pension based on their annual salary
 * @param annualSalary - the teacher's annual salary
 * @param currentAge - the teacher's current age
 */
export const estimateTeacherPensionValue = (
  annualSalary: number,
  currentAge: number,
) => {
  const annualPensionBeforeTax =
    annualSalary * ACCRUED_PENSION_PER_YEAR * RETIREMENT_LENGTH_YEARS;
  const annualPensionAfterTax =
    annualPensionBeforeTax * (1 - BASIC_RATE_INCOMETAX);
  const npv = estimateNPVOfTeacherPension(currentAge, annualPensionAfterTax);
  return npv;
};

/**
 * Adjust the user inputs to represent a teacher
 */
const toTeacher = (nonTeacher: UserInputs): UserInputs => {
  const teacher: UserInputs = {
    ...nonTeacher,
    annualSalary: nonTeacher.annualSalary,
    // reduce the hours of work per day
    hoursOfWorkPerDay: 32.5 / 5,
    // assume that there's no real wraparound care needed
    inOfficeIncrementalChildcareCost: 0,
    hourlyHolidayChildcareCost: 0,
    holidayDaysPerYear: SCHOOL_HOLIDAY_DAYS,
    // knock out the private sector pension
    employeePensionContributionPc: 0,
    employerPensionContributionPc: 0,
    employerSacrificingPension: false,
    // assume that you can drive 5 miles to work at a school and it takes 15 minutes
    drivingDistancePerCommuteMiles: 5,
    commuteDoorToDoorMinutes: 15,
    // assume that you're not paying for parking
    dailyParkingCost: 0,
    dailyTrainBusTicketCost: 0,
    flexiSeasonTicketCost: 0,
    seasonTicketCost: 0,
  };
  return teacher;
};

/**
 * Estimate the equivalent teacher salary required to result in the same take-home pay as a teacher with a given salary and childcare costs
 * @param nonTeacher - the user inputs for a non-teacher
 * @returns the equivalent teacher salary
 */
const calculateTeacherEquivalent = (
  nonTeacher: UserInputs,
  currentTakeHome: ScenarioResult,
) => {
  const asTeacher = toTeacher(nonTeacher);
  const initialTeacherTakeHome = calcTakeHome(asTeacher);
  const requiredSalary = salarySolver(
    asTeacher,
    initialTeacherTakeHome.takeHomeTotal,
    currentTakeHome.takeHomeTotal,
  );
  return requiredSalary;
};

export default calculateTeacherEquivalent;
