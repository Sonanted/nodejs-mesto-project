import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import UnauthorizedError from '../errors/UnauthorizedError';
import { SECRET_KEY } from '../constants';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload as { _id: string };
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
