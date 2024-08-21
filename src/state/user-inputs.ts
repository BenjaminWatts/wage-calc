import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { minimumAnnualLeave, workingDays } from '../calcs/take-home/days';
import * as d from './defaults';

// initial values for the user inputs

const userInputs = createSlice({
  name: 'userInputs',
  initialState: d.allDefaults,
  reducers: {
    // reset actions

    resetAll: () => d.allDefaults,
    resetSalaryAndPension: (state) => {
      state = { ...state, ...d.defaults.salaryAndPension };
    },
    resetWorkingSchedule: (state) => {
      state = { ...state, ...d.defaults.workingSchedule };
    },
    resetChildren: (state) => {
      state.children = [];
    },
    resetChild: (state, action: PayloadAction<number>) => {
      state.children = state.children.map((_, i) =>
        i !== action.payload ? _ : d.child,
      );
    },
    resetCommuting: (state) => {
      state = { ...state, ...d.defaults.commuting };
    },

    // update actions
    updateCurrentAge: (state, action: PayloadAction<number>) => {
      state.currentAge = action.payload;
    },
    updateAnnualSalary: (state, action: PayloadAction<number>) => {
      state.annualSalary = action.payload;
    },
    updateDaysPerWeekOfWorking: (state, action: PayloadAction<number>) => {
      state.daysPerWeekOfWorking = action.payload;
      state.daysPerWeekInOffice = Math.min(
        state.daysPerWeekInOffice,
        action.payload,
      );
      state.holidayDaysPerYear = Math.ceil(
        Math.max(
          Math.min(
            state.holidayDaysPerYear,
            workingDays({
              daysPerWeekOfWorking: action.payload,
              holidayDaysPerYear: state.holidayDaysPerYear,
            }),
          ),
          minimumAnnualLeave(action.payload),
        ),
      );
    },
    updateHoursOfWorkPerDay: (state, action: PayloadAction<number>) => {
      state.hoursOfWorkPerDay = action.payload;
    },
    updateEmployerPensionContributionPc: (
      state,
      { payload }: PayloadAction<number>,
    ) => {
      state.employerPensionContributionPc = payload;
    },
    updateEmployeePensionContributionPc: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.employeePensionContributionPc = action.payload;
    },
    updateDaysPerWeekInOffice: (state, action: PayloadAction<number>) => {
      state.daysPerWeekInOffice = Math.round(action.payload);
    },
    updateHolidayDaysPerYear: (state, action: PayloadAction<number>) => {
      state.holidayDaysPerYear = Math.round(action.payload);
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
      action: PayloadAction<{
        index: number;
        hourlyTermtimeChildcareCost: number;
      }>,
    ) => {
      state.children = state.children.map((c, i) =>
        i === action.payload.index
          ? {
              ...c,
              hourlyTermtimeChildcareCost:
                action.payload.hourlyTermtimeChildcareCost,
            }
          : c,
      );
    },
    updateHourlyHolidayChildcareCost: (
      state,
      action: PayloadAction<{
        index: number;
        hourlyHolidayChildcareCost: number;
      }>,
    ) => {
      state.children = state.children.map((c, i) =>
        i === action.payload.index
          ? {
              ...c,
              hourlyHolidayChildcareCost:
                action.payload.hourlyHolidayChildcareCost,
            }
          : c,
      );
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

export const selectCurrentAge = (state: RootState) =>
  state.userInputs.currentAge;
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

export const selectHourlyTermtimeChildcareCost = (
  state: RootState,
  index: number,
) => state.userInputs.children[index].hourlyTermtimeChildcareCost;

export const selectHourlyHolidayChildcareCost = (
  state: RootState,
  index: number,
) => state.userInputs.children[index].hourlyHolidayChildcareCost;

export const selectDailyDogWalkerCost = (state: RootState) =>
  state.userInputs.dailyDogWalkerCost;
export const selectDrivingDistancePerCommuteMiles = (state: RootState) =>
  state.userInputs.drivingDistancePerCommuteMiles;
// export const selectCarFuelType = (state: RootState) =>
//   state.userInputs.carFuelType;
export const selectCommuteDoorToDoorMinutes = (state: RootState) =>
  state.userInputs.commuteDoorToDoorMinutes;
export const selectDailyParkingCost = (state: RootState) =>
  state.userInputs.dailyParkingCost;
export const selectDailyTrainBusTicketCost = (state: RootState) =>
  state.userInputs.dailyTrainBusTicketCost;
export const selectFlexiSeasonTicketCost = (state: RootState) =>
  state.userInputs.flexiSeasonTicketCost;

export default userInputs;
