import * as React from 'react';
import { Box, VStack } from '@chakra-ui/layout';
import { useExchanges } from 'api';
import { helpers } from 'utils';
import { Asset, ErrorMessage, Header, Layout, Loading, SubHeading } from 'components';

export type Props = Record<string, never>;

const Home: React.FC<Props> = () => {
  const { data, isLoading, error, isError } = useExchanges();

  const filterData = React.useMemo(() => {
    return Object.values(data?.exchange_rates ?? {})
      .filter(helpers.filterExchanges)
      .map(helpers.formatExchangeData);
  }, [data]);

  // Determine the loading state
  if (isLoading) {
    return <Loading>Loading Exchange Data...</Loading>;
  }

  // Unable to parse the API result
  if (isError) {
    return <ErrorMessage description={error?.message ?? ''} />;
  }

  return (
    <Layout>
      <Header>Markets</Header>
      <SubHeading>Current market prices</SubHeading>
      <Box w='100%' as='main'>
        <VStack as='ul'>
          {filterData.map((item, index) => {
            return <Asset key={index} item={item} isLast={index === filterData.length - 1} />;
          })}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Home;
