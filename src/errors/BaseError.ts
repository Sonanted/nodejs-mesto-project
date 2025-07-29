import { Error } from 'mongoose';

class BaseError extends Error {
  statusCode: number;

  constructor(message: string = 'Внутренняя ошибка сервера', statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default BaseError;
