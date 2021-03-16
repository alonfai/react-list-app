import { useHistory } from 'react-router-dom';
import { constants } from 'utils';

export type Props = Record<string, never>;

const NoMatch: React.FC<Props> = () => {
  const history = useHistory();

  history.push(constants.Routes.Home);
  return null;
};

export default NoMatch;
