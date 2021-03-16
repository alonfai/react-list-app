import * as React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import { TradeResponse } from './types';

type TradeQueryKey = [
  key: string,
  item: {
    asset: string;
    before?: string;
    limit: number;
  }
];
type TradePageParam = number;

async function fetchTrades(context: QueryFunctionContext<TradeQueryKey, TradePageParam>) {
  const { asset, limit, before } = context.queryKey[1];
  const response = await fetch(
    `${process.env.REACT_APP_API_EXCHANGE_DOMAIN}/products/${asset}/trades?limit=${limit}${
      before ? `&before=${before}` : ''
    }`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function useTrades(asset: string, limit: number, before = '') {
  const trades = React.useRef<TradeResponse[]>([]);
  const result = useQuery<TradeResponse[], Error>(
    ['useTrades', { asset, limit, before }],
    fetchTrades
  );

  if (result.data) {
    trades.current = [...trades.current, ...result.data];
  }

  return {
    ...result,
    data: trades.current,
    hasNextPage: result.data?.length === limit,
  };
}
