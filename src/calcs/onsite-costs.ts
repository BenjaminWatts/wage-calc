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

const calcSeasonTicketCost = (uI: UserInputs) => {
  if (uI.seasonTicketCost) return uI.seasonTicketCost;
  if (!uI.dailyTrainBusTicketCost) return 0;
  const annualTicketCost = SEASON_TICKET_DAYS_YEAR * uI.dailyTrainBusTicketCost;
  return annualTicketCost * (1 - DEFAULT_SEASON_TICKET_DISCOUNT);
};

/**
 *
 * @param ui
 * @param seasonTicketCost
 * @param onsiteDays
 */
const calcFlexiSeasonTicketCost = (
  uI: UserInputs,
  seasonTicketCost: number,
  onsiteDays: number,
) => {
  const flexiSeasonTicketCost =
    uI.flexiSeasonTicketCost ||
    seasonTicketCost * (1 - DEFAULT_FLEXI_SEASON_TICKET_DISCOUNT);
  const flexiTicketShortfallDays = Math.max(0, onsiteDays - FLEXI_DAYS_YEAR);
  if (flexiTicketShortfallDays == 0 || !uI.dailyTrainBusTicketCost) {
    return flexiSeasonTicketCost;
  }
  return (
    flexiSeasonTicketCost +
    uI.dailyTrainBusTicketCost * flexiTicketShortfallDays
  );
};

/**
 * Calculate the public transport costs annually
 * @param uI The user inputs
 * @returns The public transport costs
 */
const annualPublicTransportCosts = (
  uI: UserInputs,
  onsiteDays: number,
): number => {
  const options: number[] = [];

  if (uI.dailyTrainBusTicketCost) {
    options.push(uI.dailyTrainBusTicketCost * onsiteDays);
  }

  const seasonTicketCost = calcSeasonTicketCost(uI);
  options.push(seasonTicketCost);
  options.push(calcFlexiSeasonTicketCost(uI, seasonTicketCost, onsiteDays));

  if (options.length === 0) return 0;
  return Math.min(...options);
};

const annualDrivingCosts = (uI: UserInputs, onsiteDays: number): number => {
  if (!uI.carFuelType) return 0;
  const costPerMile = COST_PER_MILE[uI.carFuelType];
  const mileageCosts = uI.drivingDistancePerCommuteMiles || 0 * costPerMile;

  const parkingCosts = uI.dailyParkingCost || 0;
  return (mileageCosts + parkingCosts) * onsiteDays;
};

const annualMealsDrycleaningDogCosts = (
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
const annualOutfitCosts = (uI: UserInputs): number => {
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
