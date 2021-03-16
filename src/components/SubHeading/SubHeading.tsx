import { Heading } from '@chakra-ui/layout';

const SubHeading: React.FC = ({ children }) => {
  return (
    <Heading
      paddingTop='24px'
      paddingBottom='8px'
      paddingLeft='16px'
      w='100%'
      color='#1058A1'
      opacity='1'
      fontSize='17px'
      as='h2'
    >
      {children}
    </Heading>
  );
};

export default SubHeading;
