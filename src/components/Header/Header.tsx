import { Heading, HeadingProps } from '@chakra-ui/react';

export type Props = HeadingProps;

const Header: React.FC<Props> = ({ children }) => {
  return (
    <Heading
      bgColor={'#1058A1'}
      opacity='1'
      paddingTop='16px'
      paddingBottom='16px'
      fontFamily='MarkPro-Heavy'
      textAlign='center'
      position='sticky'
      top='0'
      w='100%'
      color='#ffffff'
      fontSize='18px'
      as='h1'
    >
      {children}
    </Heading>
  );
};

export default Header;
