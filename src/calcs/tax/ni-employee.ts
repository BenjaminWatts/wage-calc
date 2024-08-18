const NI_THRESHOLD_PRIMARY = 9500;
const NI_RATE_PRIMARY = 0.12;
const NI_THRESHOLD_ADDITIONAL = 50000;
const NI_RATE_ADDITIONAL = 0.02;

function calculateNIEmployee(annualSalary: number): number {
  let total = 0;
  if (annualSalary > NI_THRESHOLD_PRIMARY) {
    total +=
      Math.min(
        annualSalary - NI_THRESHOLD_PRIMARY,
        NI_THRESHOLD_ADDITIONAL - NI_THRESHOLD_PRIMARY,
      ) * NI_RATE_PRIMARY;
  }
  if (annualSalary > NI_THRESHOLD_ADDITIONAL) {
    total += (annualSalary - NI_THRESHOLD_ADDITIONAL) * NI_RATE_ADDITIONAL;
  }
  return total;
}

export default calculateNIEmployee;
