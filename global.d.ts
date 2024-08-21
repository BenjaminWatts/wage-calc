// Define the types for the user inputs
type Child = {
  years: number;
  months: number;
  hourlyTermtimeChildcareCost: number;
  hourlyHolidayChildcareCost: number;
};

type UserInputs = {
  currentAge: number;
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
  // transport inputs
  drivingDistancePerCommuteMiles: number;
  // carFuelType: 'petrol' | 'diesel' | 'electric';
  commuteDoorToDoorMinutes: number;
  dailyParkingCost: number;
  dailyTrainBusTicketCost: number;
  flexiSeasonTicketCost?: number;
  seasonTicketCost?: number;
  overnightHotelCost: number;
  // food/clothing/pet inputs
  dailyBreakfastCoffeeCost?: number;
  dailyLunchCost?: number;
  dryCleaningCostPerDay?: number;
  outfitCost?: number; // the cost of a daily outfit for work
  dailyDogWalkerCost?: number;
  // pension inputs
  employerPensionContributionPc: number;
  employeePensionContributionPc: number;
  employerSacrificingPension: boolean;
};

type MainOutput = {
  takeHomePayPerHour: number;
  payriseRequired: number;
  teacherSalaryRequired: number;
};

interface TaxCalculationResult {
  total: number;
  marginalRate: number;
}

interface ScenarioResult {
  tax: TaxCalculationResult;

  childcareTotal: number;
  takeHomeTotal: number;

  workingAndCommutingHours: number;
  netHourlyPay: number;

  onsiteCosts: number;
}

interface HybridSplitResult {
  notAdjusted: ScenarioResult[];
  adjusted: number[];
}

interface CalculationResult {
  takeHome: ScenarioResult;
  hybridSplits: HybridSplitResult;
  teacher: number;
  contractor: number;
}
