export const Routes = {
  Root: '/',
  Home: '/home',
  Trade: '/trades/:tradeId',
  Others: '*',
};

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * number of trade history quotes to send on each API call to /trades
 */
export const TradeHistoryLimitRequest = 20;

/**
 * API Fetching maximum retry attempts on error
 */
export const MAX_API_RETRIES = 3;

export const CryptoAssets = {
  BTC: 'Bitcoin',
  ETH: 'Ether',
  XRP: 'Ripple',
  LINK: 'Chainlink',
};
