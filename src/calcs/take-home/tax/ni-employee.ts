export const NI_THRESHOLD_PRIMARY = 9500;
export const NI_RATE_PRIMARY = 0.08;
export const NI_THRESHOLD_ADDITIONAL = 50000;
export const NI_RATE_ADDITIONAL = 0.02;

function calculateNIEmployee(annualSalary: number): number {
  let total = 0;
  if (annualSalary > NI_THRESHOLD_PRIMARY) {
    const cappedSalary = Math.min(annualSalary, NI_THRESHOLD_ADDITIONAL);
    total += (cappedSalary - NI_THRESHOLD_PRIMARY) * NI_RATE_PRIMARY;
  }
  if (annualSalary > NI_THRESHOLD_ADDITIONAL) {
    total += (annualSalary - NI_THRESHOLD_ADDITIONAL) * NI_RATE_ADDITIONAL;
  }
  return total;
}

export default calculateNIEmployee;
