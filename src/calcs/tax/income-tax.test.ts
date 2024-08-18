import * as incomeTax from './income-tax';

describe('Income Tax', () => {
  test('£10000 - below personal allowance means to tax', () => {
    expect(incomeTax.calculateAnnualIncomeTax(10000)).toBe(0);
  });

  test('£20000', () => {
    expect(incomeTax.calculateAnnualIncomeTax(20000)).toBe(1500);
  });

  test('£50000', () => {
    expect(incomeTax.calculateAnnualIncomeTax(50000)).toBe(7500);
  });
});
