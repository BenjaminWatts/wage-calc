import * as c from './child-care';

describe('hoursOfFreeChildcare', () => {
  it('returns 0  if under 9 months', () => {
    const parentEligible = false;
    expect(
      c.hoursOfFreeChildcare(
        {
          years: 0,
          months: 8,

          hourlyHolidayChildcareCost: 0,
          hourlyTermtimeChildcareCost: 0,
        },
        parentEligible,
      ),
    ).toBe(0);
  });

  it('returns 30 for children under 5, if parent is eligible', () => {
    const parentEligible = true;
    expect(
      c.hoursOfFreeChildcare(
        {
          years: 4,
          months: 0,

          hourlyHolidayChildcareCost: 0,
          hourlyTermtimeChildcareCost: 0,
        },
        parentEligible,
      ),
    ).toBe(30);
  });

  it('returns SCHOOL_WEEK_LENGTH as number of free hours for children 5 and over', () => {
    const parentEligible = true;
    expect(
      c.hoursOfFreeChildcare(
        {
          years: 5,
          months: 0,

          hourlyHolidayChildcareCost: 0,
          hourlyTermtimeChildcareCost: 0,
        },
        parentEligible,
      ),
    ).toBe(c.SCHOOL_WEEK_LENGTH);
  });

  it('returns 0 if parent is not eligible', () => {
    const parentEligible = false;
    expect(
      c.hoursOfFreeChildcare(
        {
          years: 4,
          months: 0,

          hourlyHolidayChildcareCost: 15,
          hourlyTermtimeChildcareCost: 15,
        },
        parentEligible,
      ),
    ).toBe(0);
  });
});

describe('hourlyHolidayChildcareCost', () => {
  it('multiplies hourlyHolidayChildcareCost by daysPerWeekOfWorking by  holidayWeeks', () => {
    expect(c.hourlyHolidayChildcareCost(5, 2, 5)).toBe(50);
  });
});

describe('calculatePaidHours', () => {
  it('subtracts freeHours from hoursPerWeek', () => {
    expect(c.calculatePaidHours(40, 10)).toBe(30);
  });

  it('if for any reason free hours exceeds hoursPerWeek, is truncated at zero', () => {
    expect(c.calculatePaidHours(25, 30)).toBe(0);
  });
});

describe('calculateHourlyTermtimeCost', () => {
  it('returns the correct cost', () => {
    const termWeeksPerYear = 39;
    expect(c.calculateHourlyTermtimeCost(5, 10)).toBe(
      termWeeksPerYear * 5 * 10,
    );
  });
});

describe('calculateTaxRebate', () => {
  it('returns 0 if parent is not eligible', () => {
    expect(c.calculateTaxRebate(false, 100)).toBe(0);
  });

  it('returns the correct rebate for childcare - the recpical of 20%', () => {
    expect(c.calculateTaxRebate(true, 100)).toBe(25);
  });

  it('caps the tax rebate for a year at TAXFREE_REBATE_LIMIT', () => {
    expect(
      c.calculateTaxRebate(
        true,
        c.TAXFREE_REBATE_LIMIT / c.INCOME_TAX_REBATE + 10,
      ),
    ).toBe(c.TAXFREE_REBATE_LIMIT);
  });
});

describe('calcCommuteHoursPerDay', () => {
  it('takes minutes, doubles and turns to hours', () => {
    expect(c.calcCommuteHoursPerDay(30)).toBe(1.0);
  });
});

describe('calcHoursPerWeek', () => {
  it('can do a simple example with no office working', () => {
    const hoursOfWorkPerDay = 8;
    const daysPerWeekOfWorking = 5;
    const daysPerWeekInOffice = 0;
    const commuteDoorToDoorMinutes = 0;
    expect(
      c.calcHoursPerWeek(
        hoursOfWorkPerDay,
        daysPerWeekOfWorking,
        daysPerWeekInOffice,
        commuteDoorToDoorMinutes,
      ),
    ).toBe(8 * 5);
  });
});

describe('fteFraction', () => {
  it('5  returns full time', () => {
    expect(c.fteFraction(5)).toBe(1);
  });
  it('6 returns full time', () => {
    expect(c.fteFraction(6)).toBe(1);
  });
});

describe('calculateHolidayDaysPerYear', () => {
  it('for a fulltime individual in the UK ', () => {
    const holidayDaysPerYear = 20;
    const daysPerWeekOfWorking = 5;
    expect(
      c.calculateHolidayDaysPerYear(holidayDaysPerYear, daysPerWeekOfWorking),
    ).toBe(20);
  });
  it('pro rata', () => {
    expect(c.calculateHolidayDaysPerYear(20, 1)).toBe(4);
  });
});

describe('calcParentEligible', () => {
  it('returns true if parent is eligible', () => {
    expect(c.calcParentEligible(10000)).toBe(true);
  });

  it('returns false if parent is not eligible', () => {
    expect(c.calcParentEligible(150000)).toBe(false);
  });

  it('returns false if parent eligible but not partner', () => {
    expect(c.calcParentEligible(10000, 110000)).toBe(false);
  });

  it('returns true if parent and partner are eligible', () => {
    expect(c.calcParentEligible(20000, 10000)).toBe(true);
  });

  it('returns false if both parent and partner are not eligible', () => {
    expect(c.calcParentEligible(100000, 100000)).toBe(false);
  });
});
