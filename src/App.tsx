import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Global } from '@emotion/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home, Trade, NoMatch } from 'pages';
import { constants } from 'utils';
import { customTheme, fonts } from 'styles';

const client = new QueryClient();

const App: React.FC = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <Global styles={fonts} />
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Switch>
            <Redirect exact from={constants.Routes.Root} to={constants.Routes.Home} />
            <Route exact path={constants.Routes.Home}>
              <Home />
            </Route>
            <Route exact path={constants.Routes.Trade}>
              <Trade />
            </Route>
            <Route path={constants.Routes.Others}>
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
