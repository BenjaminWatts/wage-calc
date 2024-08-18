import * as o from './onsite-costs';

describe('calcSeasonTicketCost', () => {
  it('should return the provided season ticket cost', () => {
    expect(
      o.estimateSeasonTicketCost({
        dailyTrainBusTicketCost: 10,
      }),
    ).toBe(100);
  });
  it('should return the calculated season ticket cost', () => {
    expect(o.estimateSeasonTicketCost({ dailyTrainBusTicketCost: 10 })).toBe(
      1950,
    );
  });
});

describe('calcFlexiSeasonTicketCost', () => {
  it('should return flexi season ticket cost if onsite days is < 8 days per month', () => {
    expect(
      o.calcFlexiSeasonTicketCost(
        { flexiSeasonTicketCost: 100, dailyTrainBusTicketCost: 10 },
        5,
      ),
    ).toBe(100);
  });
  it('will topup with daily ticket cost if onsite days is > 8 days per month', () => {
    expect(
      o.calcFlexiSeasonTicketCost(
        { flexiSeasonTicketCost: 100, dailyTrainBusTicketCost: 10 },
        8 * 12 + 1,
      ),
    ).toBe(110);
  });
});

describe('annualPublicTransportCosts', () => {
  it('if the user never goes to the office, will return 0', () => {
    expect(
      o.annualPublicTransportCosts(
        {
          dailyTrainBusTicketCost: 10,
        },
        0,
      ),
    ).toBe(0);
  });

  it('if the user goes to the office 8 days per month, will return the season ticket cost', () => {
    const flexiSeasonTicketCost = 100;
    expect(
      o.annualPublicTransportCosts(
        {
          dailyTrainBusTicketCost: 500,
          flexiSeasonTicketCost,
        },
        8 * 12,
      ),
    ).toBe(flexiSeasonTicketCost);
  });

  it('if the user goes to the office 9 days per month, will return the season ticket cost plus the daily ticket cost', () => {
    const flexiSeasonTicketCost = 100;
    expect(
      o.annualPublicTransportCosts(
        {
          dailyTrainBusTicketCost: 500,
          flexiSeasonTicketCost,
        },
        8 * 12 + 1,
      ),
    ).toBe(flexiSeasonTicketCost + 500);
  });

  it('if the user goes to the office every day, will return the annual season ticket cost', () => {
    const seasonTicketCost = 100;
    expect(
      o.annualPublicTransportCosts(
        {
          dailyTrainBusTicketCost: 500,
          seasonTicketCost,
        },
        8 * 12 + 1,
      ),
    ).toBe(seasonTicketCost);
  });
});
