// calculate the costs associated with working onsite

import {
  SEASON_TICKET_DAYS_YEAR,
  DEFAULT_SEASON_TICKET_DISCOUNT,
  DEFAULT_FLEXI_SEASON_TICKET_DISCOUNT,
  FLEXI_DAYS_YEAR,
  COST_PER_MILE,
} from '../constants';

/**
 * Estimate the cost of a season ticket. If the season ticket cost is provided, return that. Otherwise, calculate the cost based on the daily ticket cost
 * @param uI The user inputs
 * @returns The cost of the season ticket
 */
export const estimateSeasonTicketCost = (uI: {
  dailyTrainBusTicketCost?: number;
}) => {
  if (!uI.dailyTrainBusTicketCost) return 0;
  const annualTicketCost = SEASON_TICKET_DAYS_YEAR * uI.dailyTrainBusTicketCost;
  return annualTicketCost * (1 - DEFAULT_SEASON_TICKET_DISCOUNT);
};

export const estimateFlexiSeasonTicketCost = (seasonTicketCost: number) =>
  seasonTicketCost * (1 - DEFAULT_FLEXI_SEASON_TICKET_DISCOUNT);

/**
 * Calculate the cost of a flexi season ticket.
 * If the flexi season ticket cost is provided, return that.
 *
 * @param uI The user inputs
 * @param seasonTicketCost
 * @param onsiteDays
 */
export const calcFlexiSeasonTicketCost = (
  uI: {
    flexiSeasonTicketCost?: number;
    seasonTicketCost?: number;
    dailyTrainBusTicketCost: number;
  },
  onsiteDays: number,
) => {
  if (!uI.flexiSeasonTicketCost && !uI.seasonTicketCost) return undefined;
  const shortfallDays = Math.max(0, onsiteDays - FLEXI_DAYS_YEAR);
  const shortfallCost = shortfallDays * uI.dailyTrainBusTicketCost;
  if (uI.flexiSeasonTicketCost) return uI.flexiSeasonTicketCost + shortfallCost;
  if (uI.seasonTicketCost) estimateFlexiSeasonTicketCost(uI.seasonTicketCost);
  +shortfallCost;

  return undefined;
};

/**
 * Calculate the public transport costs annually
 * If a season ticket cost is provided, return that.
 * Otherwise, calculate the cost based on the daily ticket cost
 * If the flexi season ticket cost is provided, return that.
 * @param uI The user inputs
 * @returns The public transport costs
 */
export const annualPublicTransportCosts = (
  uI: {
    dailyTrainBusTicketCost: number;
    flexiSeasonTicketCost?: number;
    seasonTicketCost?: number;
  },
  onsiteDays: number,
): number => {
  const options: number[] = [];

  options.push(uI.dailyTrainBusTicketCost * onsiteDays);

  if (uI.seasonTicketCost) {
    options.push(uI.seasonTicketCost);
  } else {
    options.push(estimateSeasonTicketCost(uI));
  }

  const flexiCost = calcFlexiSeasonTicketCost(uI, onsiteDays);
  if (flexiCost) options.push(flexiCost);

  if (options.length === 0) return 0;
  return Math.min(...options);
};

export const dailyDrivingCosts = (uI: UserInputs): number => {
  const mileageCosts = uI.drivingDistancePerCommuteMiles || 0 * COST_PER_MILE;
  const parkingCosts = uI.dailyParkingCost || 0;
  return mileageCosts + parkingCosts;
};

export const annualDrivingCosts = (
  uI: UserInputs,
  onsiteDays: number,
): number => onsiteDays * dailyDrivingCosts(uI);

export const annualMealsDrycleaningDogCosts = (
  uI: UserInputs,
  onsiteDays: number,
): number => {
  let total: number = 0;
  if (uI.dailyBreakfastCoffeeCost) {
    total += uI.dailyBreakfastCoffeeCost;
  }
  if (uI.dailyLunchCost) {
    total += uI.dailyLunchCost;
  }
  if (uI.dryCleaningCostPerDay) {
    total += uI.dryCleaningCostPerDay;
  }
  if (uI.dailyDogWalkerCost) {
    total += uI.dailyDogWalkerCost;
  }
  return total * onsiteDays;
};

/**
 * Estimates the cost of annually buying work outfits
 * @param uI The user inputs
 * @returns The cost of the work outfits as a
 */
export const annualOutfitCosts = (uI: UserInputs): number => {
  if (!uI.outfitCost) return 0;
  if (!uI.daysPerWeekInOffice || uI.daysPerWeekInOffice === 0) return 0;
  return uI.outfitCost * uI.daysPerWeekInOffice;
};

export const estimateWorkingWeeks = (uI: UserInputs): number => {
  const nonHolidayWeeksFraction =
    uI.holidayDaysPerYear / (52 * uI.daysPerWeekOfWorking);

  const workingWeeks = nonHolidayWeeksFraction * 52;
  return workingWeeks;
};

export const estimateOvernightCosts = (
  uI: UserInputs,
  workingWeeks: number,
): number => {
  const hotelAndDinnerCost = uI.overnightHotelCost || 0;
  const nightsPerWeek = Math.max(0, uI.daysPerWeekInOffice - 1);

  const weeklyHotelCosts = hotelAndDinnerCost * nightsPerWeek;

  return weeklyHotelCosts * workingWeeks;
};

export const onsiteCosts = (
  uI: UserInputs,
  onsiteDays: number,
  hasOvernights: boolean,
): number => {
  let total = 0;
  if (hasOvernights) {
    const workingWeeks = estimateWorkingWeeks(uI);
    total += estimateOvernightCosts(uI, workingWeeks);
    total += uI.dailyTrainBusTicketCost * workingWeeks;
    total += dailyDrivingCosts(uI) * workingWeeks;
  } else {
    total += annualPublicTransportCosts(uI, onsiteDays);
  }
  total += annualOutfitCosts(uI);
  total += annualMealsDrycleaningDogCosts(uI, onsiteDays);
  return total;
};
export default onsiteCosts;
