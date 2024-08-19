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
 */
const salarySolver = (
  existing: UserInputs,
  currentTakeHome: number,
  requiredTakeHome: number,
): number => {
  if (currentTakeHome === requiredTakeHome) return existing.annualSalary;

  const increment = getIncrement(existing, requiredTakeHome);

  const startingValue = existing.annualSalary;
  let takeHome = calcTakeHome(existing);
  let salary = startingValue + increment; // Use the 'increment' variable instead of 'INCREMENT'

  let count = 0;
  while (takeHome.takeHomeTotal < requiredTakeHome) {
    if (count > COUNT_LIMIT) throw new Error('Count limit exceeded');

    salary += increment; // Use the 'increment' variable instead of 'INCREMENT'
    existing.annualSalary = salary;
    takeHome = calcTakeHome(existing);

    count += 1;
  }
  return salary;
};

export default salarySolver;
