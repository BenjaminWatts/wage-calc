// rounding for the final outputs displayed to users

export const round = (value: number, decimalPlaces: number) => {
  if (value === 0) {
    return 0;
  }
  return (
    Math.round(value * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
};

export const financial = {
  annual: (value: number) => `£${round(value, 0).toLocaleString()}`,
  hourly: (value: number) => `£${round(value, 2).toLocaleString()}/hour`,
};

/**
 * Take a decimal value (e.g. a marginal tax rate of 0.43) and render it for the browser/app
 */
export const percentage = (value: number) => {
  if (value === 0) {
    return '0%';
  }
  return `${Math.round(value * 100)}%`;
};

export const hours = {
  annual: (value: number) => {
    if (value === 0) {
      return '0';
    }
    return round(value, 0).toLocaleString();
  },
  daily: (value: number) => {
    if (value === 0) {
      return '0';
    }
    return round(value, 1).toLocaleString();
  },
};
