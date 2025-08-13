import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { createUser, login } from './controllers/user';
import auth from './middlewares/auth';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import userRouter from './routes/user';
import cardRouter from './routes/card';
import { loginValidator, userValidator } from './validators/user';

const app = express();

const dbUrl = 'mongodb://localhost:27017/mestodb';
const dbPort = 3000;

declare module 'express' {
  interface Request {
    user?: {
      _id: string;
    };
  }
}

mongoose.set({ strictQuery: true });
mongoose.connect(dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.post('/signin', loginValidator, login);
app.post('/signup', userValidator, createUser);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(dbPort);
