import { getUnixTime } from 'date-fns';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { TradeResponse } from './types';

type TradeQueryKey = [
  key: string,
  item: {
    asset: string;
    limit: number;
  }
];
type TradePageParam = number;

async function fetchTrades(context: QueryFunctionContext<TradeQueryKey, TradePageParam>) {
  const { asset, limit } = context.queryKey[1];
  let url = `${process.env.REACT_APP_API_EXCHANGE_DOMAIN}/products/${asset}/trades?limit=${limit}`;
  if (context.pageParam) {
    url += `&before=${getUnixTime(new Date(context.pageParam)).toString()}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export default function useTrades(asset: string, limit: number) {
  const result = useInfiniteQuery<TradeResponse[], Error>(
    ['useTrades', { asset, limit }],
    fetchTrades,
    {
      getNextPageParam: lastPage => lastPage[lastPage.length - 1].timestamp,
    }
  );
  return result;
}
