// Define the types for the user inputs
type Child = {
  years: number;
  months: number;
};

type UserInputs = {
  // salary inputs
  annualSalary: number;
  partnerAnnualIncome?: number;
  //days inputs
  daysPerWeekOfWorking: number;
  holidayDaysPerYear: number;
  daysPerWeekInOffice: number;
  // hours inputs
  hoursOfWorkPerDay: number;
  // children and childcare inputs
  children: Child[];
  hourlyTermtimeChildcareCost: number;
  wraparoundChildcareCost?: number;
  hourlyHolidayChildcareCost?: number;
  // transport inputs
  drivingDistancePerCommuteMiles: number;
  carFuelType?: "petrol" | "diesel" | "electric";
  commuteDoorToDoorMinutes: number;
  dailyParkingCost: number;
  dailyTrainBusTicketCost: number;
  flexiSeasonTicketCost?: number;
  seasonTicketCost?: number;
  // food/clothing/pet inputs
  dailyBreakfastCoffeeCost?: number;
  dailyLunchCost?: number;
  dryCleaningCostPerDay?: number;
  outfitCost?: number; // the cost of a daily outfit for work
  dailyDogWalkerCost?: number;
  // pension inputs
  employerPensionContributionPc?: number;
  employeePensionContributionPc?: number;
};

type MainOutput = {
  takeHomePayPerHour: number;
  payriseRequired: number;
  teacherSalaryRequired: number;
};
