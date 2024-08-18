// calculate the costs associated with working onsite

const COST_PER_MILE = {
  electric: 0.05,
  petrol: 0.12,
  diesel: 0.14,
};

const FLEXI_SEASON_TICKET_DAYS_PER_MONTH = 8;
const MONTHS_IN_YEAR = 12;
const FLEXI_DAYS_YEAR = FLEXI_SEASON_TICKET_DAYS_PER_MONTH * MONTHS_IN_YEAR;

const SEASON_TICKET_DAYS_YEAR = 52 * 5;

const DEFAULT_SEASON_TICKET_DISCOUNT = 0.25; // relative to daily ticket costs
const DEFAULT_FLEXI_SEASON_TICKET_DISCOUNT = 0.2; // a 20% discount relative to the annual season ticket

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

export const annualDrivingCosts = (
  uI: UserInputs,
  onsiteDays: number,
): number => {
  if (!uI.carFuelType) return 0;
  const costPerMile = COST_PER_MILE[uI.carFuelType];
  const mileageCosts = uI.drivingDistancePerCommuteMiles || 0 * costPerMile;

  const parkingCosts = uI.dailyParkingCost || 0;
  return (mileageCosts + parkingCosts) * onsiteDays;
};

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

const onsiteCosts = (userInputs: UserInputs, onsiteDays: number): number =>
  annualPublicTransportCosts(userInputs, onsiteDays) +
  annualDrivingCosts(userInputs, onsiteDays) +
  annualMealsDrycleaningDogCosts(userInputs, onsiteDays) +
  annualOutfitCosts(userInputs);

export default onsiteCosts;
