import * as d from './days';

describe('annualLeave', () => {
  it('should return the default number of annual leave days if nothing provided', () => {
    expect(
      d.annualLeave({
        holidayDaysPerYear: undefined,
      }),
    ).toBe(25);
  });
  it('should return the provided number of annual leave days', () => {
    expect(
      d.annualLeave({
        holidayDaysPerYear: 30,
      }),
    ).toBe(30);
  });
});

describe('onsiteDays', () => {
  it('should return 0 if no days per week in office', () => {
    expect(
      d.onsiteDays(
        {
          daysPerWeekInOffice: undefined,
          daysPerWeekOfWorking: 5,
        },
        250,
      ),
    ).toBe(0);
  });
  it('should return the correct number of onsite days', () => {
    expect(
      d.onsiteDays(
        {
          daysPerWeekInOffice: 3,
          daysPerWeekOfWorking: 5,
        },
        250,
      ),
    ).toBe(150);
  });
});

describe('workingDays', () => {
  it('should return the correct number of working days', () => {
    expect(
      d.workingDays({
        daysPerWeekOfWorking: 5,
        holidayDaysPerYear: 25,
      }),
    ).toBeCloseTo(236, 0);
  });
});

describe('schoolHolidayExcess', () => {
  it('should return the correct number of school holidays', () => {
    expect(d.schoolHolidayExcess(236)).toBeCloseTo(41, 0);
  });
});
