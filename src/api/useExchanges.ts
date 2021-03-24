import { useQuery } from 'react-query';
import { ExchangeRatesResponse } from './types';

export const QUERY_KEY = 'loadExchanges';

async function fetchExchanges(): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${process.env.REACT_APP_API_BASE}/exchange_rates`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function useExchanges() {
  return useQuery<ExchangeRatesResponse, Error>([QUERY_KEY], fetchExchanges);
}
