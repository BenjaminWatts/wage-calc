import salarySolver from './salary-solver';
import calcTakeHome from './take-home';

const IN_OFFICE_DAYS = [0, 1, 2, 3, 4, 5];

interface AdjustedOfficeResult {
  ui: UserInputs;
  result: ScenarioResult;
}

const adjustInOfficeDays = (
  baseCase: UserInputs,
  daysPerWeekInOffice: number,
): AdjustedOfficeResult => {
  const ui = {
    ...baseCase,
    daysPerWeekInOffice,
  };

  const result = calcTakeHome(ui);

  return {
    ui,
    result,
  };
};

/**
 * Adjust the salaries of the employees to preserve take-home pay
 * @param results The results of the salary solver
 */
const adjustSalaries = (
  results: AdjustedOfficeResult[],
  requiredTakeHome: number,
) =>
  results.map(({ result, ui }) =>
    salarySolver(ui, result.takeHomeTotal, requiredTakeHome),
  );

/**
    Evaluates how the take-home pay varies with the number of days per week in the office
    * @param baseCase The base case user inputs
    * @param baseTakeHome The take-home pay for the base case
*/
export const calculateHybridSplit = (
  baseCase: UserInputs,
  baseTakeHome: ScenarioResult,
) => {
  // Calculate the take-home pay assuming that the employer makes no adjustments to the salary
  const notAdjusted = IN_OFFICE_DAYS.map((days) =>
    adjustInOfficeDays(baseCase, days),
  );
  // now with the base case of the current number of days in the office, calculate the +/- change salary to preserve take-home pay
  const adjusted = adjustSalaries(notAdjusted, baseTakeHome.takeHomeTotal);

  return {
    notAdjusted: notAdjusted.map((x) => x.result),
    adjusted,
  };
};
