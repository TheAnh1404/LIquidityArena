export const CONFIG = {
  ROUND_DURATION_MS: 5 * 60 * 1000, // 5 minutes
  MIN_STAKE: 10, // XLM
  MAX_STAKE: 1000000, // XLM
  PLATFORM_FEE_BPS: 250, // 2.5%
  WS_PORT: 3001,
  API_PORT: 3002,
  PRICE_FEED_INTERVAL_MS: 1000,
  TICK_SIZE: 0.0001,
};

export const STELLAR_CONFIG = {
  NETWORK: 'TESTNET',
  HORIZON_URL: 'https://horizon-testnet.stellar.org',
  RPC_URL: 'https://soroban-testnet.stellar.org',
  CONTRACT_ID: 'CC...placeholder', // To be filled after deployment
};
