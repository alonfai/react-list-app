export type CrpytoAsset = 'BTC' | 'ETH' | 'XRP' | 'LINK';

export type FairAsset = 'USD' | 'AUD';

export type Currency = FairAsset | CrpytoAsset;

export class ResponseError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export type ExchangeRate = {
  base_currency: Currency;
  counter_currency: Currency;
  bid: string;
  midpoint: string;
  ask: string;
  roundtrip_spread: string;
};

export type TradeResponse = {
  tid: string;
  price: string;
  size: string;
  value: string;
  taker_side: 'buy' | 'sell';
  timestamp: string;
};

export type ExchangeCollection = {
  [id: string]: ExchangeRate;
};

export interface ExchangeRatesResponse {
  exchange_rates: ExchangeCollection;
}
