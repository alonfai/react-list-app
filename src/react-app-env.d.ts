/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_API_BASE: string;
    readonly REACT_APP_API_EXCHANGE_DOMAIN: string;
  }
}
