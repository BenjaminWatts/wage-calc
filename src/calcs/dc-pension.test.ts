import * as d from './dc-pension';

describe('estimateDirectEmployerPensionContribution', () => {
  it('should return 0 if the employer pension contribution is 0', () => {
    expect(d.estimateDirectEmployerPensionContribution(0, 100)).toBe(0);
  });
  it('should return the employer pension contribution if the employer pension contribution is 10%', () => {
    expect(d.estimateDirectEmployerPensionContribution(0.1, 100)).toBe(10);
  });
  it('should return the employer pension contribution if the employer pension contribution is 20%', () => {
    expect(d.estimateDirectEmployerPensionContribution(0.2, 100)).toBe(20);
  });
});

describe('estimateEmployerKickback', () => {
  it('should return 0 if the grossSacrifiedValue is 0', () => {
    expect(d.estimateEmployerKickback(100, 0)).toBe(0);
  });
  it('should return 0 if the salary is below the threshold', () => {
    expect(d.estimateEmployerKickback(100, 5)).toBe(0);
  });
  it('should return the employer kickback if the salary is above the threshold', () => {
    expect(d.estimateEmployerKickback(40000, 100)).toBe(100 * 0.138);
  });
  it('kickback should be curtailed to the SECONDARY_THRESHOLD if the grossSacrifice is large', () => {
    expect(d.estimateEmployerKickback(40000, 40000)).toBe(
      (40000 - 9100) * 0.138,
    );
  });
});

describe('estimateEmployeeIncomeTaxSavings', () => {
  it('should return 0 if the grossSacrifiedValue is 0', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(100, 0)).toBe(0);
  });
  it('if salary is below the personal allowance, no saving', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(5000, 100)).toBe(0);
  });
  it('if salary is above the personal allowance, saving is 20%', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(15000, 100)).toBe(100 * 0.2);
  });
  it('if salary is above the higher rate threshold, saving is 40%', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(60000, 100)).toBe(100 * 0.4);
  });
  it('if salary is in the band  when personal allowance is being tapered, saving is 65%', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(100000, 100)).toBe(100 * 0.65);
  });
  it('if salary is well above the additional rate threshold, saving is 45%', () => {
    expect(d.estimateEmployeeIncomeTaxSavings(250000, 100)).toBe(100 * 0.45);
  });
});

describe('estimateEmployeeNiSavings', () => {
  it('if the annual salary is below the NI_THRESHOLD_PRIMARY of 9500, no saving', () => {
    expect(d.estimateEmployeeNiSavings(9000, 100)).toBe(0);
  });
  it('if salary is between NI_THRESHOLD_PRIMARY 9500 and NI_THRESHOLD_ADDITIONAL 50000, saving is 8%', () => {
    expect(d.estimateEmployeeNiSavings(10000, 100)).toBe(100 * 0.08);
  });
  it('if salary is above NI_THRESHOLD_ADDITIONAL and sacrifice only affects the higher band, saving is 2%', () => {
    expect(d.estimateEmployeeNiSavings(60000, 100)).toBe(100 * 0.02);
  });
  it('if salary is just above NI_THRESHOLD_ADDITIONAL, then a bigger sacrifice will by part at 2% and part 8% ', () => {
    expect(d.estimateEmployeeNiSavings(51000, 2000)).toBe(
      1000 * 0.02 + 1000 * 0.08,
    );
  });
});

describe('estimateEmployeePensionValue', () => {
  it('should return 0 if the employee pension contribution is 0', () => {
    expect(
      d.estimateEmployeePensionValue({
        employeePensionContributionPc: 0,
        annualSalary: 100,
        employerSacrificingPension: false,
      }),
    ).toBe(0);
  });
  it('if salary is below ', () => {});
});
