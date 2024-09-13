import {
  ADDITIONAL_RATE_THRESHOLD,
  HIGHER_RATE_THRESHOLD,
  PERSONAL_ALLOWANCE,
  PERSONAL_ALLOWANCE_END,
  PERSONAL_ALLOWANCE_START,
} from './constants';
import * as incomeTax from './income-tax';

describe('calculateBasicRateTax', () => {
  it('should return 0 if taxable income is below the basic rate threshold', () => {
    expect(incomeTax.calculateBasicRateTax(0, 0)).toBe(0);
  });
  it('at £20,000 everything above PERSONAL_ALLOWANCE is taxed at 20% ', () => {
    expect(
      incomeTax.calculateBasicRateTax(20000, PERSONAL_ALLOWANCE),
    ).toBeCloseTo(0.2 * (20000 - PERSONAL_ALLOWANCE), -1);
  });
  it('at £50,000 everything above PERSONAL_ALLOWANCE is taxed at 20% ', () => {
    expect(
      incomeTax.calculateBasicRateTax(50000, PERSONAL_ALLOWANCE),
    ).toBeCloseTo((50000 - PERSONAL_ALLOWANCE) * 0.2, -1);
  });
  it('at £60,000 - basic rate tax is no higher than at £50,000', () => {
    expect(
      incomeTax.calculateBasicRateTax(60000, PERSONAL_ALLOWANCE),
    ).toBeCloseTo(7540);
  });
  it('at £100,000 - basic rate tax is no higher than at £50,000', () => {
    expect(
      incomeTax.calculateBasicRateTax(100000, PERSONAL_ALLOWANCE),
    ).toBeCloseTo(7540);
  });
  it('at £300,000 - basic rate tax is no higher than at £50,000', () => {
    expect(incomeTax.calculateBasicRateTax(300000, 0)).toBe(7540);
  });
});

describe('calculateHigherRateTax', () => {
  it('at £50,000 none of the income is taxed at the higher rate', () => {
    expect(incomeTax.calculateHigherRateTax(50000, PERSONAL_ALLOWANCE)).toBe(0);
  });
  it('at £60,000 - pay £3888.40 higher rate tax ', () => {
    const taxableIncome = 60000;
    expect(
      incomeTax.calculateHigherRateTax(taxableIncome, PERSONAL_ALLOWANCE),
    ).toBeCloseTo(3888, -1);
  });
  it('at £100,000 - pay 40% on everything between HIGHER_RATE_THRESHOLD and £100,000', () => {
    expect(
      incomeTax.calculateHigherRateTax(100000, PERSONAL_ALLOWANCE),
    ).toBeCloseTo(
      0.4 * (100000 - HIGHER_RATE_THRESHOLD - PERSONAL_ALLOWANCE),
      -1,
    );
  });
  it('when half of PERSONAL_ALLOWANCE is withdrawn - pay 40% on everything between HIGHER_RATE_THRESHOLD and £100,000', () => {
    const annualSalary = 112570;
    const higherTax = incomeTax.calculateHigherRateTax(
      annualSalary,
      PERSONAL_ALLOWANCE / 2,
    );
    expect(higherTax).toBeCloseTo(27430.4, -1); // from HMRC
  });

  it('when all of PERSONAL_ALLOWANCE is withdrawn - pay 40% on everything between HIGHER_RATE_THRESHOLD and £100,000', () => {
    const higherTax = incomeTax.calculateHigherRateTax(125140, 0);
    expect(higherTax).toBeCloseTo(34976, -1); // from HMRC
  });
});

describe('calculateAdditionalRateTax', () => {
  it('at threshold none due', () => {
    expect(
      incomeTax.calculateAdditionalRateTax(ADDITIONAL_RATE_THRESHOLD),
    ).toBe(0);
  });
  it('at £150,000 - additional rate tax is 45% of the amount above the additional rate threshold', () => {
    expect(incomeTax.calculateAdditionalRateTax(150000)).toBe(
      (150000 - ADDITIONAL_RATE_THRESHOLD) * 0.45,
    );
  });
});

describe('calculateAnnualIncomeTax', () => {
  it('at belove PERSONAL_ALLOWANCE - no tax due', () => {
    expect(incomeTax.calculateAnnualIncomeTax(PERSONAL_ALLOWANCE)).toBe(0);
  });
  it('at £20,000 - basic rate tax is 20% of the amount above the personal allowance', () => {
    expect(incomeTax.calculateAnnualIncomeTax(20000)).toBe(
      (20000 - PERSONAL_ALLOWANCE) * 0.2,
    );
  });
  it('at HIGHER_RATE_THRESHOLD - basic rate tax is 20% of the amount above the personal allowance', () => {
    expect(incomeTax.calculateAnnualIncomeTax(HIGHER_RATE_THRESHOLD)).toBe(
      (HIGHER_RATE_THRESHOLD - PERSONAL_ALLOWANCE) * 0.2,
    );
  });
  it('at £100,000 - basic rate tax is 20% from PERSONAL_ALLOWANCE to HIGHER_RATE_THRESHOLD and then 40% from HIGHER_RATE_THRESHOLD to £100,000', () => {
    expect(incomeTax.calculateAnnualIncomeTax(100000)).toBeCloseTo(
      7540 + 19888.4,
      -1,
    );
  });
});
