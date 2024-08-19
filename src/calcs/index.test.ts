import c from './index';

// lets create a hypothetical simple family with 2 parents and 2 children

const simpleFamily: UserInputs = {
  currentAge: 35,
  annualSalary: 95000,
  partnerAnnualIncome: 55000,
  daysPerWeekInOffice: 3,
  daysPerWeekOfWorking: 5,
  holidayDaysPerYear: 28,
  hoursOfWorkPerDay: 8,
  children: [
    {
      years: 4,
      months: 0,
    },
    {
      years: 2,
      months: 0,
    },
  ],
  hourlyTermtimeChildcareCost: 10,
  inOfficeIncrementalChildcareCost: 20,
  hourlyHolidayChildcareCost: 15,
  drivingDistancePerCommuteMiles: 10,
  carFuelType: 'petrol',
  commuteDoorToDoorMinutes: 60,
  dailyParkingCost: 10,
  dailyTrainBusTicketCost: 25,
  dailyBreakfastCoffeeCost: 7,
  dailyLunchCost: 10,
  dryCleaningCostPerDay: 5,
  outfitCost: 150,
  dailyDogWalkerCost: 15,
  employerPensionContributionPc: 3,
  employeePensionContributionPc: 5,
  employerSacrificingPension: true,
};

describe('basic family', () => {
  it('can calculate output without errors', () => {
    const result = c(simpleFamily);
    console.log(JSON.stringify(result, null, 2));
  });
});
