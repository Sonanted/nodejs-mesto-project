import { Request, Response, NextFunction } from 'express';

import BaseError from '../errors/BaseError';

const errorHandler = (err: BaseError, _req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
};

export default errorHandler;
