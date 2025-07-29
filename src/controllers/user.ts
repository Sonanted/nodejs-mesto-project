import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import User from '../models/user';

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

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({
      name,
      about,
      avatar,
    });
    res.status(201).send(user);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные для создания пользователя'));
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
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный _id пользователя'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для обновления пользователя'));
      }
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
      { new: true }
    ).orFail(new NotFoundError('Пользователь с таким id не найден'));
    res.send(user);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный _id пользователя'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный аватар для создания пользователя'));
      }
    } else {
      next(err);
    }
  }
};
