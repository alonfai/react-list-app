import { Types } from 'api';
import { filterExchanges, formatExchangeData } from './helpers';

describe('filterExchanges', () => {
  it('counter_curency not AUD => return false', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'BTC',
      bid: '280.303375912',
      counter_currency: 'ALGO',
      midpoint: '283.132966529',
      roundtrip_spread: '1.9888',
    };
    expect(filterExchanges(data)).toBe(false);
  });

  it('base_currency not one of predefine list of currencies => returns false', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'AAVE',
      bid: '280.303375912',
      counter_currency: 'AUD',
      midpoint: '283.132966529',
      roundtrip_spread: '1.9888',
    };
    expect(filterExchanges(data)).toBe(false);
  });

  it('mixed data object with valid data with "AUD" and "base_currency" one of valid list => return true', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'BTC',
      bid: '280.303375912',
      counter_currency: 'AUD',
      midpoint: '283.132966529',
      roundtrip_spread: '1.9888',
    };
    expect(filterExchanges(data)).toBe(true);
  });
});

describe('formatExchangeData', () => {
  it('midpoint below 100 => keep 4 digits', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'BTC',
      bid: '280.303375912',
      counter_currency: 'AUD',
      midpoint: '50.0123345',
      roundtrip_spread: '1.9888',
    };
    const result = formatExchangeData(data);
    expect(result.midpoint).toEqual('50.0123');
  });

  it('midpoint above 999.99 => keep 4 digits', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'BTC',
      bid: '280.303375912',
      counter_currency: 'AUD',
      midpoint: '35732.132966529',
      roundtrip_spread: '1.9888',
    };
    const result = formatExchangeData(data);
    expect(result.midpoint).toEqual('35732.1330');
  });

  it('midpoint between 100 and 999.99 => round to 2 decimal places', () => {
    const data: Types.ExchangeRate = {
      ask: '285.99124424',
      base_currency: 'BTC',
      bid: '280.303375912',
      counter_currency: 'AUD',
      midpoint: '283.132966529',
      roundtrip_spread: '1.9888',
    };
    const result = formatExchangeData(data);
    expect(result.midpoint).toEqual('283.13');
  });
});
