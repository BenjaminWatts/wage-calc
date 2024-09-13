// create
import pa from './personal-allowance';

describe('calculateAdjustedPersonalAllowance', () => {
  test('income <= 100000', () => {
    expect(pa(100000)).toBe(12570);
  });

  test('half way point has half the normal personal allowance', () => {
    expect(pa(112500)).toBe(6320);
  });

  test('income >= 125140', () => {
    expect(pa(125140)).toBe(0);
  });
});
