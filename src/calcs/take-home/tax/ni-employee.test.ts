import calculateNIEmployee from './ni-employee';

const EXPECTED_MAX_NI_PRIMARY = (50000 - 9500) * 0.12;

describe('calculateNIEmployee', () => {
  test('when annualSalary is less than NI_THRESHOLD_PRIMARY, it should return zero', () => {
    expect(calculateNIEmployee(9500)).toBe(0);
  });
  test('when annualSalary is greater than NI_THRESHOLD_PRIMARY, it should return the correct NI', () => {
    expect(calculateNIEmployee(10000)).toBe(60);
  });
  test('at the additional threshold, it should return EXPECTED_MAX_NI_PRIMARY', () => {
    expect(calculateNIEmployee(50000)).toBe(EXPECTED_MAX_NI_PRIMARY);
  });
  test('when annualSalary is greater than NI_THRESHOLD_ADDITIONAL, it should return EXPECTED_MAX_NI_PRIMARY plus additional 2% for everything above', () => {
    expect(calculateNIEmployee(60000)).toBe(
      EXPECTED_MAX_NI_PRIMARY + (60000 - 50000) * 0.02,
    );
  });
});
