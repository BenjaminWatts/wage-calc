import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserInputsState extends UserInputs {}

// initial values for the user inputs

const AVERAGE_INCOME = 30000;
const AVERAGE_CHILDCARE_COST_HOUR = 6.53;

const defaults: UserInputsState = {
  annualSalary: AVERAGE_INCOME,
  partnerAnnualIncome: AVERAGE_INCOME,
  daysPerWeekOfWorking: 5,
  hoursOfWorkPerDay: 8,
  employerPensionContributionPc: 3,
  employeePensionContributionPc: 0,
  daysPerWeekInOffice: 5,
  holidayDaysPerYear: 25,
  children: [
    { years: 4, months: 0 },
    { years: 2, months: 0 },
  ],
  hourlyTermtimeChildcareCost: AVERAGE_CHILDCARE_COST_HOUR,
  wraparoundChildcareCost: AVERAGE_CHILDCARE_COST_HOUR,
  hourlyHolidayChildcareCost: AVERAGE_CHILDCARE_COST_HOUR,
  dailyDogWalkerCost: 10,
  drivingDistancePerCommuteMiles: 10,
  carFuelType: 'petrol',
  commuteDoorToDoorMinutes: 30,
  dailyParkingCost: 5,
  dailyTrainBusTicketCost: 5,
  flexiSeasonTicketCost: 5,
};

const userInputs = createSlice({
  name: 'userInputs',
  initialState: defaults,
  reducers: {
    updateAnnualSalary: (state, action: PayloadAction<number>) => {
      state.annualSalary = action.payload;
    },
    updateDaysPerWeekOfWorking: (state, action: PayloadAction<number>) => {
      state.daysPerWeekOfWorking = action.payload;
    },
    updateHoursOfWorkPerDay: (state, action: PayloadAction<number>) => {
      state.hoursOfWorkPerDay = action.payload;
    },
    updateEmployerPensionContributionPc: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.employerPensionContributionPc = action.payload;
    },
    updateEmployeePensionContributionPc: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.employeePensionContributionPc = action.payload;
    },
    updateDaysPerWeekInOffice: (state, action: PayloadAction<number>) => {
      state.daysPerWeekInOffice = action.payload;
    },
    updateHolidayDaysPerYear: (state, action: PayloadAction<number>) => {
      state.holidayDaysPerYear = action.payload;
    },
    addChild: (state, { payload }: PayloadAction<Child>) => {
      state.children.push(payload);
    },
    updateChild: (
      state,
      { payload }: PayloadAction<{ index: number; child: Child }>,
    ) => {
      state.children[payload.index] = payload.child;
    },
    removeChild: (state, action: PayloadAction<number>) => {
      state.children.splice(action.payload, 1);
    },
    updatePartnerAnnualIncome: (state, action: PayloadAction<number>) => {
      state.partnerAnnualIncome = action.payload;
    },
    updateHourlyTermtimeChildcareCost: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.hourlyTermtimeChildcareCost = action.payload;
    },
    updateWraparoundChildcareCost: (state, action: PayloadAction<number>) => {
      state.wraparoundChildcareCost = action.payload;
    },
    updateHourlyHolidayChildcareCost: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.hourlyHolidayChildcareCost = action.payload;
    },
    updateDailyDogWalkerCost: (state, action: PayloadAction<number>) => {
      state.dailyDogWalkerCost = action.payload;
    },
    updateDailyBreakfastCoffeeCost: (state, action: PayloadAction<number>) => {
      state.dailyBreakfastCoffeeCost = action.payload;
    },
    updateDailyLunchCost: (state, action: PayloadAction<number>) => {
      state.dailyLunchCost = action.payload;
    },
    updateDryCleaningCostPerDay: (state, action: PayloadAction<number>) => {
      state.dryCleaningCostPerDay = action.payload;
    },
    updateDrivingDistancePerCommuteMiles: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.drivingDistancePerCommuteMiles = action.payload;
    },
    updateCarFuelType: (
      state,
      action: PayloadAction<'petrol' | 'diesel' | 'electric'>,
    ) => {
      state.carFuelType = action.payload;
    },
    updateCommuteDoorToDoorMinutes: (state, action: PayloadAction<number>) => {
      state.commuteDoorToDoorMinutes = action.payload;
    },
    updateDailyParkingCost: (state, action: PayloadAction<number>) => {
      state.dailyParkingCost = action.payload;
    },
    updateDailyTrainBusTicketCost: (state, action: PayloadAction<number>) => {
      state.dailyTrainBusTicketCost = action.payload;
    },
    updateFlexiSeasonTicketCost: (state, action: PayloadAction<number>) => {
      state.flexiSeasonTicketCost = action.payload;
    },
  },
});

export const a = userInputs.actions;

export const selectAnnualSalary = (state: RootState) =>
  state.userInputs.annualSalary;
export const selectDaysPerWeekOfWorking = (state: RootState) =>
  state.userInputs.daysPerWeekOfWorking;
export const selectHoursOfWorkPerDay = (state: RootState) =>
  state.userInputs.hoursOfWorkPerDay;
export const selectEmployerPensionContributionPc = (state: RootState) =>
  state.userInputs.employerPensionContributionPc;
export const selectEmployeePensionContributionPc = (state: RootState) =>
  state.userInputs.employeePensionContributionPc;
export const selectDaysPerWeekInOffice = (state: RootState) =>
  state.userInputs.daysPerWeekInOffice;
export const selectHolidayDaysPerYear = (state: RootState) =>
  state.userInputs.holidayDaysPerYear;
export const selectChildren = (state: RootState) => state.userInputs.children;
export const selectPartnerAnnualIncome = (state: RootState) =>
  state.userInputs.partnerAnnualIncome;
export const selectHourlyTermtimeChildcareCost = (state: RootState) =>
  state.userInputs.hourlyTermtimeChildcareCost;
export const selectWraparoundChildcareCost = (state: RootState) =>
  state.userInputs.wraparoundChildcareCost;
export const selectHourlyHolidayChildcareCost = (state: RootState) =>
  state.userInputs.hourlyHolidayChildcareCost;
export const selectDailyDogWalkerCost = (state: RootState) =>
  state.userInputs.dailyDogWalkerCost;
export const selectDrivingDistancePerCommuteMiles = (state: RootState) =>
  state.userInputs.drivingDistancePerCommuteMiles;
export const selectCarFuelType = (state: RootState) =>
  state.userInputs.carFuelType;
export const selectCommuteDoorToDoorMinutes = (state: RootState) =>
  state.userInputs.commuteDoorToDoorMinutes;
export const selectDailyParkingCost = (state: RootState) =>
  state.userInputs.dailyParkingCost;
export const selectDailyTrainBusTicketCost = (state: RootState) =>
  state.userInputs.dailyTrainBusTicketCost;
export const selectFlexiSeasonTicketCost = (state: RootState) =>
  state.userInputs.flexiSeasonTicketCost;

export default userInputs;
