import * as wh from './working-hours';

describe('annualCommuteHours', () => {
  it('should return 0 if commuteDoorToDoorMinutes is not provided', () => {
    expect(
      wh.annualCommuteHours(
        {
          commuteDoorToDoorMinutes: undefined,
        },
        250,
      ),
    ).toBe(0);
  });
  it('should return the correct number of annual commute hours', () => {
    const onsiteDays = 100;
    const commuteDoorToDoorMinutes = 30;
    expect(
      wh.annualCommuteHours(
        {
          commuteDoorToDoorMinutes,
        },
        onsiteDays,
      ),
    ).toBe((onsiteDays * commuteDoorToDoorMinutes) / 60);
  });
});

describe('annualWorkingHours', () => {
  it('should default to 8 hours per day if hoursOfWorkPerDay not provided', () => {
    expect(
      wh.annualWorkingHours(
        {
          hoursOfWorkPerDay: undefined,
        },
        250,
      ),
    ).toBe(250 * 8);
  });
  it('if hoursOfWorkPerDay is provided, ', () => {
    const hoursOfWorkPerDay = 7;
    expect(
      wh.annualWorkingHours(
        {
          hoursOfWorkPerDay,
        },
        250,
      ),
    ).toBe(250 * hoursOfWorkPerDay);
  });
});

describe('workingHours', () => {
  it('should return the sum of annualWorkingHours and annualCommuteHours', () => {
    const hoursOfWorkPerDay = 7;
    const workingDays = 250;
    const onsiteDays = 100;
    const commuteDoorToDoorMinutes = 30;
    expect(
      wh.workingHours(
        {
          hoursOfWorkPerDay,
          commuteDoorToDoorMinutes,
        },
        workingDays,
        onsiteDays,
      ),
    ).toBe(1800);
  });
});
