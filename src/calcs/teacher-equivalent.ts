// analyse what teacher salary would be required, to result in the same take-home pay as a teacher with a given salary and childcare costs
import {
  ACCRUED_PENSION_PER_YEAR,
  BASIC_RATE_INCOMETAX,
  DISCOUNT_RATE,
  TEACHER_RETIREMENT_AGE,
  TEACHER_RETIREMENT_LENGTH_YEARS,
} from './constants';
import salarySolver from './salary-solver';
import calcTakeHome from './take-home';
import { SCHOOL_HOLIDAY_DAYS } from './take-home/constants';

/**
 * Estimate the net present value of the teacher's pension
 * @param currentAge - the teacher's current age
 * @param annualPension - the teacher's annual pension after tax that they will receive in retirement
 */
export const estimateNPVOfTeacherPension = (
  currentAge: number,
  annualPension: number,
) => {
  let total = 0;
  // for each of year of retirement add discounted total
  for (let i = 0; i < TEACHER_RETIREMENT_LENGTH_YEARS; i++) {
    total += annualPension / Math.pow(1 + DISCOUNT_RATE, i);
  }
  // now discount back to the present day
  const yearsUntilRetirement = Math.max(0, TEACHER_RETIREMENT_AGE - currentAge);
  const currentNpv = total * (1 + DISCOUNT_RATE);
};

export const estimatePensionNPV = (
  annualPensionAfterTax: number,
  currentAge: number,
) => {
  const npv = estimateNPVOfTeacherPension(currentAge, annualPensionAfterTax);
  return npv;
};

/**
 * Estimate the pension afforded by one year of service
 * NOTE _ THIS IS NOT WHAT WILL BE RECEIVED IN ONE YEAR IN RETIREMENT UNLESS TEACHER ONLY WORKS FOR ONE YEAR
 * @param annualSalary
 */
export const estimateAnnualPension = (annualSalary: number) =>
  annualSalary *
  ACCRUED_PENSION_PER_YEAR *
  TEACHER_RETIREMENT_LENGTH_YEARS *
  (1 - BASIC_RATE_INCOMETAX);

/**
 * Estimate the value of a teacher's pension based on their annual salary
 * @param annualSalary - the teacher's annual salary
 * @param currentAge - the teacher's current age
 */
export const estimateTeacherPensionValue = (
  annualSalary: number,
  currentAge: number,
) => {
  const annualPensionAfterTax = estimateAnnualPension(annualSalary);
  return estimatePensionNPV(annualPensionAfterTax, currentAge);
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
    // assume teachers get free breakfast and lunch
    dailyBreakfastCoffeeCost: 0,
    dailyLunchCost: 0,
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
