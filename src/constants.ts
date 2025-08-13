import crypto from 'crypto';

export const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/mestodb',
  SECRET_KEY = 'secret-key',
} = process.env;

export const USER_NAME_MIN_LENGTH = 2;
export const USER_NAME_MAX_LENGTH = 30;

export const USER_ABOUT_MIN_LENGTH = 2;
export const USER_ABOUT_MAX_LENGTH = 300;

export const CARD_NAME_MIN_LENGTH = 2;
export const CARD_NAME_MAX_LENGTH = 30;
