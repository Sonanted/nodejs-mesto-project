import { Request, Response, NextFunction } from 'express';

import BaseError from '../errors/BaseError';

const errorHandler = (err: BaseError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'Внутренняя ошибка сервера' });
  next();
};

export default errorHandler;
