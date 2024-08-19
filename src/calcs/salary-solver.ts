import calcTakeHome from './take-home';

const INCREMENT = 250;

/**
 * Determine the increment to use when adjusting the salary
 * If the current take-home pay is less than the required take-home pay, return the increment
 * Otherwise, return the negative increment
 * @param existing The existing user inputs
 */
const getIncrement = (existing: UserInputs, requiredTakeHome: number) =>
  calcTakeHome(existing).takeHomeTotal < requiredTakeHome
    ? INCREMENT
    : -INCREMENT;

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

  // console.log(
  //   `calculating salaryChange needed from ${existing.annualSalary} to move takehome by ${changeNeeded} from ${currentTakeHome} to ${requiredTakeHome} in increments of ${increment}`,
  // );

  let annualSalary = existing.annualSalary;
  let count = 0;

  // now we need to iterate to find the salary that gives us the required take-home pay
  while (count < COUNT_LIMIT) {
    // console.log(`trying salary ${x} -- attempt ${count}`);

    const impliedTakeHome = calcTakeHome({
      ...existing,
      annualSalary,
    }).takeHomeTotal;

    const impliedChange = currentTakeHome - impliedTakeHome;

    if (Math.abs(impliedChange) > Math.abs(changeNeeded)) {
      // console.log(`found solution.
      //   To move takehome by ${changeNeeded} from ${currentTakeHome} to ${requiredTakeHome} we need to change salary by ${impliedChange} to ${annualSalary} in ${count} iterations

      //   `);
      return annualSalary;
    }

    if (annualSalary <= 0) {
      console.log('Salary is less than 0 -- not worth working at all');
      return 0;
    }

    annualSalary += increment;
    count += 1;
  }

  throw new Error('No solution found');
};

export default salarySolver;
