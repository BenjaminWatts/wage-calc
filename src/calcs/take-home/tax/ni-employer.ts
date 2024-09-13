const EMPLOYER_THRESHOLD = 758 * 12;
const EMPLOYER_RATE = 0.138;

export const estimateEmployerNi = (annualSalary: number): number => {
  let total = 0;
  if (annualSalary > EMPLOYER_THRESHOLD) {
    return (total += (annualSalary - EMPLOYER_THRESHOLD) * EMPLOYER_RATE);
  }
  return total;
};

export default estimateEmployerNi;
