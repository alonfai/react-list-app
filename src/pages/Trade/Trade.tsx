import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { useTrades } from 'api';
import { ErrorMessage, Header, Layout, Loading, TradeItem } from 'components';
import { constants, useIntersectionObserver } from 'utils';

export type Props = Record<string, never>;

const Trade: React.FC<Props> = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const name = tradeId.replace('-', '/');
  const asset = tradeId.replace('-', '');

  const result = useTrades(asset, constants.TradeHistoryLimitRequest);
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage } = result;

  const element = useIntersectionObserver({
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  // Determine the loading state
  if (isLoading) {
    return <Loading>Loading {name} Histortical Data...</Loading>;
  }

  // Unable to parse the API result
  if (isError) {
    return <ErrorMessage description={error?.message ?? ''} />;
  }

  return (
    <Layout>
      <Header>{name} Trade History</Header>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th fontSize='17px' color='#1058A1' textTransform='none'>
              Time
            </Th>
            <Th fontSize='17px' color='#1058A1' textTransform='none'>
              Price
            </Th>
            <Th fontSize='17px' color='#1058A1' textTransform='none' isNumeric>
              Size
            </Th>
          </Tr>
        </Thead>
        <Tbody overflow='auto' height='100px'>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((trade, tradeIndex) => {
                // Last rendered trade
                if (
                  pageIndex + 1 === data.pages.length &&
                  tradeIndex + 1 === constants.TradeHistoryLimitRequest
                ) {
                  return <TradeItem key={trade.tid} trade={trade} ref={element} />;
                }
                return <TradeItem key={trade.tid} trade={trade} />;
              })}
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
};

export default Trade;
