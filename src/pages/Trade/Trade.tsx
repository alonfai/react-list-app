import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, TableColumnHeaderProps } from '@chakra-ui/react';
import { useTrades } from 'api';
import { ErrorMessage, Header, Layout, Loading, TradeItem } from 'components';
import { constants, useIntersectionObserver } from 'utils';

const TableHead: React.FC<TableColumnHeaderProps> = ({ children, ...rest }) => {
  return (
    <Th
      fontSize='17px'
      color='#1058A1'
      bgColor='#F2F3F8'
      textTransform='none'
      position='sticky'
      top='55px'
      {...rest}
    >
      {children}
    </Th>
  );
};

export type Props = Record<string, never>;

const Trade: React.FC<Props> = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const name = tradeId.replace('-', '/');
  const asset = tradeId.replace('-', '');

  const result = useTrades(asset, constants.TradeHistoryLimitRequest);
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage } = result;
  const ref = React.useRef<HTMLTableRowElement>(null);

  useIntersectionObserver({
    ref,
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
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead textAlign='right'>Size</TableHead>
          </Tr>
        </Thead>
        <Tbody overflowY='auto' overflowX='hidden' height='100px'>
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((trade, tradeIndex) => {
                // Last rendered trade
                if (
                  pageIndex + 1 === data.pages.length &&
                  tradeIndex + 1 === constants.TradeHistoryLimitRequest
                ) {
                  return <TradeItem key={trade.tid} trade={trade} ref={ref} />;
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
