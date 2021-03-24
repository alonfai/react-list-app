import { getUnixTime } from 'date-fns';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { ResponseError, TradeResponse } from './types';
import { constants } from 'utils';

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
    throw new ResponseError(
      response.status === constants.STATUS_CODES.NOT_FOUND
        ? 'Unable to find historical trade history'
        : 'Network response was not ok',
      response.status
    );
  }
  return response.json();
}

export default function useTrades(asset: string, limit: number) {
  const result = useInfiniteQuery<TradeResponse[], ResponseError>(
    ['useTrades', { asset, limit }],
    fetchTrades,
    {
      getNextPageParam: lastPage => lastPage[lastPage.length - 1].timestamp,
      retry: (failureCount, error) => {
        // if api request for resouce not found, don't attempt to run a retry request. On other scenarios, try to re-run the request till max retries attempts reached
        return error.status !== constants.STATUS_CODES.NOT_FOUND
          ? failureCount <= constants.MAX_API_RETRIES
          : false;
      },
    }
  );
  return result;
}
