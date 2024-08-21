const AVERAGE_INCOME = 30000;

export const defaults = {
  salaryAndPension: {
    currentAge: 35,
    annualSalary: AVERAGE_INCOME,
    partnerAnnualIncome: 0,
    daysPerWeekOfWorking: 5,
    employerPensionContributionPc: 0.03,
    employeePensionContributionPc: 0,
    employerSacrificingPension: true,
  },
  workingSchedule: {
    daysPerWeekOfWorking: 5,
    hoursOfWorkPerDay: 8,
    daysPerWeekInOffice: 3,
    holidayDaysPerYear: 25,
  },
  commuting: {
    dailyDogWalkerCost: 10,
    drivingDistancePerCommuteMiles: 10,
    commuteDoorToDoorMinutes: 30,
    dailyParkingCost: 0,
    dailyTrainBusTicketCost: 5,
    flexiSeasonTicketCost: 0,
    overnightHotelCost: 0,
  },
};
export default defaults;

export const allDefaults: UserInputs = {
  ...defaults.salaryAndPension,
  ...defaults.workingSchedule,
  children: [],
  ...defaults.commuting,
};

export const child: Child = {
  years: 0,
  months: 0,
  hourlyHolidayChildcareCost: 15,
  hourlyTermtimeChildcareCost: 15,
};
