import express from 'express';
import mongoose from 'mongoose';

import errorHandler from './middlewares/errorHandler';
import mockUser from './middlewares/mockUser';
import userRouter from './routes/user';
import cardRouter from './routes/card';

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

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mockUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorHandler);

app.listen(dbPort);
