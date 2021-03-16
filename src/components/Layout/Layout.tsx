import { Flex } from '@chakra-ui/layout';

export type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Flex direction='column' justifyContent='center' align='flex-start'>
      {children}
    </Flex>
  );
};

export default Layout;
