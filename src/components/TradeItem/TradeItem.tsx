import * as React from 'react';
import { Box, Image, Td, Text, Tr, forwardRef } from '@chakra-ui/react';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import { Types } from 'api';

import trendUp from 'icons/trend-up.svg';
import trendDown from 'icons/trend-down.svg';

export type Props = {
  trade: Types.TradeResponse;
};

export function getTimeValue(timestamp: string): string {
  const ts = new Date(timestamp);
  return `${getHours(ts).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${getMinutes(
    ts
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${getSeconds(
    ts
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
}

export function TradeItem({ trade }, ref: React.ForwardedRef<any>) {
  const time = getTimeValue(trade.timestamp);
  return (
    <Tr
      ref={ref}
      flexDir='row'
      alignItems='center'
      justifyContent='space-between'
      h='48px'
      bgColor='white'
    >
      <Td>
        <div>{time}</div>
      </Td>
      <Td color={trade.taker_side === 'buy' ? 'green' : 'red'} whiteSpace='nowrap'>
        <Box>
          <Image
            boxSize='20px'
            objectFit='cover'
            display='inline'
            src={trade.taker_side === 'buy' ? trendUp : trendDown}
            alt={trade.taker_side === 'buy' ? 'trend-up' : 'trend-down'}
          />
          <Text pl='8px' as='div' display='inline'>
            {Number(trade.price).toString()}
          </Text>
        </Box>
      </Td>
      <Td isNumeric>{trade.size}</Td>
    </Tr>
  );
}

export default forwardRef<Props, any>(TradeItem);
