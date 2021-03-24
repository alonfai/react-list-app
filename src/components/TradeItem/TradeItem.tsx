import * as React from 'react';
import { Image, Td, Text, Tr } from '@chakra-ui/react';
import { getHours, getMinutes, getSeconds } from 'date-fns';
import { Types } from 'api';

import trendUp from 'icons/trend-up.svg';
import trendDown from 'icons/trend-down.svg';

export type Props = {
  trade: Types.TradeResponse;
};

export default React.forwardRef<HTMLTableRowElement, Props>(function TradeItem({ trade }, ref) {
  const ts = new Date(trade.timestamp);
  const time = `${getHours(ts).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${getMinutes(
    ts
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${getSeconds(
    ts
  ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`;
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
      <Td color={trade.taker_size === 'buy' ? 'green' : 'red'} whiteSpace='nowrap'>
        <Image
          boxSize='20px'
          objectFit='cover'
          display='inline'
          src={trade.taker_size === 'buy' ? trendUp : trendDown}
          alt={trade.taker_size === 'buy' ? 'trend-up' : 'trend-down'}
        />
        <Text pl='8px' as='div' display='inline'>
          {Number(trade.price).toString()}
        </Text>
      </Td>
      <Td isNumeric>{trade.size}</Td>
    </Tr>
  );
});
