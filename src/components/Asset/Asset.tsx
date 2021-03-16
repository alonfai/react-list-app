import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Box, Text, Flex, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Types } from 'api';
import { constants } from 'utils';
import Logo from '../Logo';

export type Props = {
  item: Types.ExchangeRate;
  isLast: boolean;
};

const Asset: React.FC<Props> = ({ item, isLast }) => {
  const href = `${item.base_currency}-${item.counter_currency}`;
  const name = `${item.base_currency}/${item.counter_currency}`;
  return (
    <LinkBox
      as='li'
      w='100%'
      bgColor='white'
      paddingTop='16px'
      paddingLeft='16px'
      paddingRight='16px'
      paddingBottom='14px'
      borderWidth='1px'
      marginBottom={isLast ? '0' : '8px'}
    >
      <LinkOverlay to={`/trades/${href}`} as={ReactRouterLink} />
      <Flex flexDir='row' justifyContent='space-between'>
        <Box display='flex'>
          <Logo asset={item.base_currency as Types.CrpytoAsset} />
          <Flex flexDir='column'>
            <Text
              pl='8px'
              color='#000000'
              opacity='1'
              fontFamily='SFProText-Medium'
              fontSize='15px'
            >
              {constants.CryptoAssets[item.base_currency]}
            </Text>
            <Text
              pt='4px'
              pl='8px'
              color='#828D96'
              opacity='1'
              fontFamily='SFProText-Regular'
              fontSize='14px'
            >
              {name}
            </Text>
          </Flex>
        </Box>
        {/* Asset Price midpoint */}
        <Box>
          <Text fontSize='15px' color='#000000' opacity='1' fontFamily='SFProText-Regular'>
            {`$${Number(item.midpoint).toLocaleString()} AUD`}
          </Text>
        </Box>
      </Flex>
      {/* <Text mb='3'>
        Catch up on what’s been cookin’ at Smashing and explore some of the most popular community
        resources.
      </Text>
      <Box as='a' color='teal.400' href='#' fontWeight='bold'>
        Some inner link
      </Box> */}
    </LinkBox>
  );
};

export default Asset;
