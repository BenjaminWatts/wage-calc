import * as c from './child-care';

describe('hoursOfFreeChildcare', () => {
  it('returns 30 for children under 5', () => {
    const parentEligible = true;
    expect(
      c.hoursOfFreeChildcare({ years: 4, months: 0 }, parentEligible),
    ).toBe(30);
  });

  it('returns 0 for children 5 and over', () => {
    const parentEligible = true;
    expect(
      c.hoursOfFreeChildcare({ years: 5, months: 0 }, parentEligible),
    ).toBe(0);
  });

  it('returns 0 if parent is not eligible', () => {
    const parentEligible = false;
    expect(
      c.hoursOfFreeChildcare({ years: 4, months: 0 }, parentEligible),
    ).toBe(0);
  });
});

describe('hourlyHolidayChildcareCost', () => {
  it('returns the correct cost', () => {
    expect(c.hourlyHolidayChildcareCost(5, 2, 5)).toBe(50);
  });
});

describe('calculatePaidHours', () => {
  it('returns the correct number of paid hours', () => {
    expect(c.calculatePaidHours(40, 10)).toBe(30);
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

  it('returns the correct rebate', () => {
    const incomeTaxRebate = 0.25;
    expect(c.calculateTaxRebate(true, 100)).toBe(25);
  });
});

describe('calcHoursPerWeek', () => {
  it('returns the correct number of hours per week', () => {
    expect(c.calcHoursPerWeek(8, 2)).toBe(16);
  });
});

describe('fteFraction', () => {
  it('returns the correct fraction', () => {
    expect(c.fteFraction(2.5)).toBe(0.5);
  });
});

describe('calculateHolidayDaysPerYear', () => {
  it('fulltime', () => {
    expect(c.calculateHolidayDaysPerYear(20, 5)).toBe(20);
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
