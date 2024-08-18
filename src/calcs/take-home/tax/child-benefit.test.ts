import * as c from './child-benefit';

describe('calculateChargeFraction', () => {
  test('when highestIncome is less than LOWER_LIMIT, it should return 0', () => {
    expect(c.calculateChargeFraction(59999)).toBe(0);
  });

  test('when highestIncome is greater than UPPER_LIMIT, it should return 1', () => {
    expect(c.calculateChargeFraction(80001)).toBe(1);
  });

  test('when highestIncome is between LOWER_LIMIT and UPPER_LIMIT, it should return the fraction', () => {
    expect(c.calculateChargeFraction(70000)).toBe(0.5);
  });
});

describe('calculateCharge', () => {
  test('should return the charge', () => {
    expect(c.calculateCharge(0.5, 3)).toBe(3150);
  });
});

describe('getHighestIncome', () => {
  test('when partner income is lower it should be ignored', () => {
    const ui = {
      annualSalary: 40000,
      partnerAnnualIncome: 30000,
      children: [],
    };
    expect(c.getHighestIncome(ui)).toBe(40000);
  });

  test('should return the highest income when partnerAnnualIncome is provided', () => {
    const ui = {
      annualSalary: 40000,
      partnerAnnualIncome: 50000,
      children: [],
    };
    expect(c.getHighestIncome(ui)).toBe(50000);
  });
});

describe('countChildren', () => {
  test('should return the number of children', () => {
    const ui = {
      annualSalary: 40000,
      children: [1, 2, 3],
    };
    expect(c.countChildren(ui)).toBe(3);
  });
});
