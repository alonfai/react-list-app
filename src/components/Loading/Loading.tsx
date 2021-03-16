import * as React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export type Props = {
  children: React.ReactNode;
};

const Loading: React.FC<Props> = ({ children }) => {
  return (
    <Flex h='100%' alignItems='center' justifyContent='center'>
      <Spinner mr='10px' />
      {children}
    </Flex>
  );
};

export default Loading;
