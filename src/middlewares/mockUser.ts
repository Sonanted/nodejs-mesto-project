import { Request, Response, NextFunction } from 'express';

const mockUser = (req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '6888faf27c7042672e5c358',
  };
  next();
};

export default mockUser;
