// Define the types for the user inputs
type Child = {
  years: number;
  months: number;
};

type UserInputs = {
  annualSalary: number;
  daysPerWeekOfWorking: number;
  hoursOfWorkPerDay: number;
  employerPensionContributionPc?: number;
  employeePensionContributionPc?: number;
  daysPerWeekInOffice: number;
  holidayDaysPerYear: number;
  children: Child[];
  partnerAnnualIncome?: number;
  hourlyTermtimeChildcareCost: number;
  wraparoundChildcareCost?: number;
  hourlyHolidayChildcareCost?: number;
  dailyDogWalkerCost?: number;
  drivingDistancePerCommuteMiles?: number;
  carFuelType?: "petrol" | "diesel" | "electric";
  commuteDoorToDoorMinutes?: number;
  dailyParkingCost?: number;
  dailyTrainBusTicketCost?: number;
  flexiSeasonTicketCost?: number;
  seasonTicketCost?: number;
  dailyBreakfastCoffeeCost?: number;
  dailyLunchCost?: number;
  dryCleaningCostPerDay?: number;
  outfitCost?: number; // the cost of a daily outfit for work
};

type MainOutput = {
  takeHomePayPerHour: number;
  payriseRequired: number;
  teacherSalaryRequired: number;
};
