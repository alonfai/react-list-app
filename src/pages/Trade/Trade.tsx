import * as React from 'react';
import { getUnixTime } from 'date-fns';
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { useTrades } from 'api';
import { ErrorMessage, Header, Layout, Loading, TradeItem } from 'components';

export type Props = Record<string, never>;

const Trade: React.FC<Props> = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const name = tradeId.replace('-', '/');
  const [before, setBefore] = React.useState('');
  const observer = React.useRef<IntersectionObserver>();

  const { data, isLoading, error, isError, hasNextPage } = useTrades(
    tradeId.replace('-', ''),
    20,
    before
  );

  const lastTradeElementRef = React.useCallback(
    node => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          const dt = new Date(data[data.length - 1].timestamp);
          const unixTime = getUnixTime(dt);
          setBefore(unixTime.toString());
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasNextPage, data]
  );

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
        <Tbody>
          {data.map((trade, index) => {
            if (data.length === index + 1) {
              return <TradeItem ref={lastTradeElementRef} key={index} trade={trade} />;
            }
            return <TradeItem key={index} trade={trade} />;
          })}
        </Tbody>
      </Table>
    </Layout>
  );
};

export default Trade;
