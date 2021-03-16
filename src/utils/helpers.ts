import { Types } from 'api';

/**
 * Query function to filter all currencies where counter equal to 'AUD' and base is part of 'BTC'/'ETH'/'XRP'/'LINK'
 * @param data specific exchange info data object
 * @returns ture/false if the given exchange object matches the request
 */
export function filterExchanges(data: Types.ExchangeRate) {
  return (
    data.counter_currency === 'AUD' && ['BTC', 'ETH', 'XRP', 'LINK'].includes(data.base_currency)
  );
}

/**
 * Query function to transform the exchange mid point with rounding logic
 * @param data given exchange info data object
 * @returns new transforned exchange info object with proper "midpoint" values
 */
export function formatExchangeData(data: Types.ExchangeRate) {
  return {
    ...data,
    midpoint:
      Number(data.midpoint) > 100 && Number(data.midpoint) < 999.99
        ? Number(data.midpoint).toFixed(2).toString()
        : Number(data.midpoint).toString(),
  };
}
