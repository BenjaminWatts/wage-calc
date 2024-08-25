import {
  TEACHER_RETIREMENT_AGE,
  TEACHER_RETIREMENT_LENGTH_YEARS,
} from './constants';
import * as t from './teacher-equivalent';

describe('estimateNPVOfTeacherPension', () => {
  it('if discount rate is 0 and retirement now, then NPV is basically RETIREMENT_LENGTH_YEARS *  annualSalary', () => {
    const currentAge = TEACHER_RETIREMENT_AGE;
    const annualPension = 1;
    expect(t.estimateNPVOfTeacherPension(currentAge, annualPension)).toBe(
      TEACHER_RETIREMENT_LENGTH_YEARS * annualPension,
    );
  });
});
