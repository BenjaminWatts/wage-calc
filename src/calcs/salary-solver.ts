import { SALARY_SOLVER_INCREMENT } from './constants';
import calcTakeHome from './take-home';

/**
 * Determine the increment to use when adjusting the salary
 * If the current take-home pay is less than the required take-home pay, return the increment
 * Otherwise, return the negative increment
 * @param existing The existing user inputs
 */
const getIncrement = (existing: UserInputs, requiredTakeHome: number) =>
  calcTakeHome(existing).takeHomeTotal < requiredTakeHome
    ? SALARY_SOLVER_INCREMENT
    : -SALARY_SOLVER_INCREMENT;

const COUNT_LIMIT = 5000;

/**
 * For a given set of user inputs, calculate the salary required to achieve a given take-home pay
 * @param existing The existing user inputs
 * @param currentTakeHome The current take-home pay. This is used as a starting point
 * @param requiredTakeHome The required take-home pay
 */
const salarySolver = (
  existing: UserInputs,
  currentTakeHome: number,
  requiredTakeHome: number,
): number => {
  if (currentTakeHome === requiredTakeHome) return existing.annualSalary;

  const changeNeeded = requiredTakeHome - currentTakeHome;

  const increment = getIncrement(existing, requiredTakeHome);

  let annualSalary = existing.annualSalary;
  let count = 0;

  while (count < COUNT_LIMIT) {
    const impliedTakeHome = calcTakeHome({
      ...existing,
      annualSalary,
    }).takeHomeTotal;

    // work out the current implied change
    const impliedChange = currentTakeHome - impliedTakeHome;

    if (Math.abs(impliedChange) > Math.abs(changeNeeded)) {
      // if enough change has been achieved, return the new result
      return annualSalary;
    }

    if (annualSalary <= 0) {
      // if the salary falls so low that it hits zero, stop the process
      return 0;
    }

    annualSalary += increment;
    count += 1;
  }

  // prevent an endless loop
  throw new Error('No solution found');
};

export default salarySolver;
