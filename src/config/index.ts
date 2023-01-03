export const IS_PROD = process.env.NODE_ENV === 'production';
export const PROXY_URL = IS_PROD
  ? 'http://198.199.83.103:3001'
  : 'http://localhost:3001';
