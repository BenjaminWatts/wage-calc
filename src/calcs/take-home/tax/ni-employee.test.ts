import calculateNIEmployee, {
  NI_RATE_ADDITIONAL,
  NI_RATE_PRIMARY,
  NI_THRESHOLD_ADDITIONAL,
  NI_THRESHOLD_PRIMARY,
} from './ni-employee';

const EXPECTED_MAX_NI_PRIMARY =
  (NI_THRESHOLD_ADDITIONAL - NI_THRESHOLD_PRIMARY) * NI_RATE_PRIMARY;

describe('calculateNIEmployee', () => {
  test('when annualSalary is less than NI_THRESHOLD_PRIMARY, it should return zero', () => {
    expect(calculateNIEmployee(NI_THRESHOLD_PRIMARY)).toBe(0);
  });
  test('when annualSalary is greater than NI_THRESHOLD_PRIMARY, it should return the correct NI', () => {
    expect(calculateNIEmployee(10000)).toBe(
      NI_RATE_PRIMARY * (10000 - NI_THRESHOLD_PRIMARY),
    );
  });
  test('at the additional threshold, it should return EXPECTED_MAX_NI_PRIMARY', () => {
    expect(calculateNIEmployee(50000)).toBe(EXPECTED_MAX_NI_PRIMARY);
  });
  test('when annualSalary is greater than NI_THRESHOLD_ADDITIONAL, it should return EXPECTED_MAX_NI_PRIMARY plus additional 2% for everything above', () => {
    expect(calculateNIEmployee(60000)).toBe(
      EXPECTED_MAX_NI_PRIMARY +
        (60000 - NI_THRESHOLD_ADDITIONAL) * NI_RATE_ADDITIONAL,
    );
  });
});
