// general calendar inputs
export const DAYS_IN_YEAR = 365;
export const MONTHS_IN_YEAR = 12;
export const WEEKS_IN_YEAR = DAYS_IN_YEAR / 7;
export const UK_BANK_HOLIDAY_COUNT = 8;
export const UK_STATUTORY_HOLIDAY_COUNT = 28;
export const DEFAULT_HOURS_PER_DAY = 8;

// income tax

export const BASIC_RATE_INCOMETAX = 0.2;
export const INCOME_TAX_REBATE = 1 / BASIC_RATE_INCOMETAX;

// national insurance
export const EMPLOYEE_NI_STANDARD_RATE = 0.06;
export const EMPLOYEE_NI_HIGHER_RATE_THRESHOLD = 50270;
export const EMPLOYEE_HIGHER_NI_RATE = 0.02;

export const EMPLOYER_NI_RATE = 0.138; // this is uncapped i.e. there is no lower level for higher salaried individuals
export const EMPLOYER_NI_THRESHOLD = 9100;

export const CONTRACTOR_NI_CLASS2_THRESHOLD = 6725; // this is effectively the level at which self-employed contractors start paying NI on a mandatory basis

// taxfree and free childcare
export const TAXFREE_REBATE_LIMIT_PER_CHILD_ANNUAL = 2000;

// school age children
export const SCHOOL_AGE_YEARS = 5;
export const SCHOOL_DAY_LENGTH = 6.5;
export const SCHOOL_WEEK_LENGTH = SCHOOL_DAY_LENGTH * 5;
export const NO_CHILDCARE_COST_MINIMUM_AGE = 12; // above this age, there are no childcare costs

// teacher equivalent
export const TEACHER_RETIREMENT_AGE = 65;
export const TEACHER_RETIREMENT_LENGTH_YEARS = 23;
export const ACCRUED_PENSION_PER_YEAR = 1 / 57;
export const DISCOUNT_RATE = 0.03;

// commuting/transport
export const COST_PER_MILE = 45;
export const FLEXI_SEASON_TICKET_DAYS_PER_MONTH = 8;
export const DEFAULT_SEASON_TICKET_DISCOUNT = 0.25; // relative to daily ticket costs
export const DEFAULT_FLEXI_SEASON_TICKET_DISCOUNT = 0.2; // a 20% discount relative to the annual season ticket

export const FLEXI_DAYS_YEAR =
  FLEXI_SEASON_TICKET_DAYS_PER_MONTH * MONTHS_IN_YEAR;

export const SEASON_TICKET_DAYS_YEAR = WEEKS_IN_YEAR * 5;

// salary solver
export const SALARY_SOLVER_INCREMENT = 250;

// pensions
export const ANNUAL_PENSION_LIMIT = 60000;

// contractor equivalent
export const FLAT_RATE_VAT = 0.03; // this is the amount that a low-cost trader is allowed to keep under the flat-rate VAT scheme
export const FLAT_RATE_VAT_LIMIT = 150000; // if the sole-trader's turnover is above this level, they are not eligible for the Flat Rate VAT scehme
