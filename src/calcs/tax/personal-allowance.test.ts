// create
import pa from './personal-allowance';

describe('calculateAdjustedPersonalAllowance', () => {
  test('income <= 100000', () => {
    expect(pa(100000)).toBe(12500);
  });

  test('half way point has half the normal personal allowance', () => {
    expect(pa(112500)).toBe(6250);
  });

  test('income >= 125140', () => {
    expect(pa(125140)).toBe(0);
  });
});
