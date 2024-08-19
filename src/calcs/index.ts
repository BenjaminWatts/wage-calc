import { calculateHybridSplit } from './hybrid-split';
import calcTakeHome from './take-home';
import calculateTeacherEquivalent from './teacher-equivalent';

/**
 * Takes user inputs and calculates:
 * 1. The take-home pay for the status quo, including deductions for direct costs of working (childcare, commuting, etc.)
 * 2. Evaluates how the take-home pay varies with the number of days per week in the office
 * 3. If the user has children, estimates the teacher equivalent salary
 */
const calculate = (uI: UserInputs): CalculationResult => {
  const takeHome = calcTakeHome(uI);
  return {
    takeHome,
    hybridSplits: calculateHybridSplit(uI, takeHome),
    teacher: calculateTeacherEquivalent(uI, takeHome),
  };
};

export default calculate;
