import { Flex } from '@chakra-ui/layout';

export type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      direction='column'
      justifyContent='center'
      align='center'
      paddingLeft='10px'
      paddingRight='10px'
    >
      {children}
    </Flex>
  );
};

export default Layout;
