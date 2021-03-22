import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { useTrades } from 'api';
import { ErrorMessage, Header, Layout, Loading, TradeItem } from 'components';
import { constants } from 'utils';

export type Props = Record<string, never>;

const Trade: React.FC<Props> = () => {
  const { tradeId } = useParams<{ tradeId: string }>();
  const name = tradeId.replace('-', '/');
  const asset = tradeId.replace('-', '');

  const result = useTrades(asset, constants.TradeHistoryLimitRequest);
  const { data, isLoading, error, isError, fetchNextPage, hasNextPage } = result;

  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        // item is visible in viewPort => we need to render the next available list of traes
        if (entries[0].isIntersecting) {
          console.error(result);
          fetchNextPage();
        }
      },
      /* <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'Nothing to load'}
      </Button> */
      { threshold: 1 }
    )
  );
  const [element, setElement] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

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
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((trade, tradeIndex) => {
                // Last rendered trade
                if (
                  pageIndex + 1 === data.pages.length &&
                  tradeIndex + 1 === constants.TradeHistoryLimitRequest
                ) {
                  return <TradeItem key={trade.tid} trade={trade} ref={setElement} />;
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
