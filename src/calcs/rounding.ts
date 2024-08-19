// rounding for the final outputs displayed to users

export const round = (value: number, decimalPlaces: number) =>
  Math.round(value * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

export const financial = {
  annual: (value: number) => `£${round(value, 0)}`,
  hourly: (value: number) => `£${round(value, 2)}/hour`,
};

/**
 * Take a decimal value (e.g. a marginal tax rate of 0.43) and render it for the browser/app
 */
export const percentage = (value: number) => `${Math.round(value * 100)}%`;

export const hours = {
  annual: (value: number) => round(value, 0),
  daily: (value: number) => round(value, 1),
};
