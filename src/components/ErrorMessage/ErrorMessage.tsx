import { Alert, AlertIcon, AlertDescription, CloseButton } from '@chakra-ui/react';

export type Props = {
  description: string;
};

const ErrorMessage: React.FC<Props> = ({ description }) => {
  return (
    <Alert status='error'>
      {' '}
      <AlertIcon />
      <AlertDescription>{description}</AlertDescription>
      <CloseButton position='absolute' right='8px' top='8px' />
    </Alert>
  );
};

export default ErrorMessage;
