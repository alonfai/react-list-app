import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/react';

export type Props = {
  description: string;
};

const ErrorMessage: React.FC<Props> = ({ description }) => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <Flex flexDir='column'>
        <AlertTitle>Error Loading: </AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Flex>
    </Alert>
  );
};

export default ErrorMessage;
