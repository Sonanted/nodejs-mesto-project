import { NextFunction, Request, Response } from 'express';
import { Error, mongo } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UnauthorizedError from '../errors/UnauthorizedError';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConfilctError';
import User from '../models/user';
import { SECRET_KEY } from '../constants';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(new UnauthorizedError('Неправильные почта или пароль'));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
      expiresIn: '7d',
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .send('Authorized');
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId).orFail(
      new NotFoundError('Пользователь с таким id не найден')
    );
    res.send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new BadRequestError('Передан некорректный id'));
    } else {
      next(err);
    }
  }
};

export const getActiveUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    const user = await User.findById(userId).orFail(new NotFoundError('Пользователь не найден'));
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, about, avatar } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    });
    res.status(201).send(await User.find({ email }));
  } catch (err) {
    if (err instanceof mongo.MongoServerError && err.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует'));
    } else {
      next(err);
    }
  }
};

export const patchUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError('Пользователь с таким id не найден'));
    res.send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new BadRequestError('Некорректный _id пользователя'));
    } else {
      next(err);
    }
  }
};

export const patchUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { avatar: req.body.avatar },
      { new: true, runValidators: true }
    ).orFail(new NotFoundError('Пользователь с таким id не найден'));
    res.send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new BadRequestError('Некорректный _id пользователя'));
    } else {
      next(err);
    }
  }
};
