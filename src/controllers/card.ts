import { Request, Response, NextFunction } from 'express';

import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';
import Card from '../models/card';

export const getCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({
      name,
      link,
      owner: req.user?._id,
    });
    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(
      new NotFoundError('Карточка с таким id не найдена')
    );
    if (card.owner.toString() !== req.user?._id) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    card.delete();
    res.status(204).send();
  } catch (err) {
    if (err instanceof Error && err.name === 'CastError') {
      next(new BadRequestError('Некорректный _id пользователя'));
    } else {
      next(err);
    }
  }
};

export const addCardLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    ).orFail(new NotFoundError('Карточка с таким id не найдена'));
    res.send(card);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный _id пользователя'));
      }
    } else {
      next(err);
    }
  }
};

export const removeCardLike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true }
    ).orFail(new NotFoundError('Карточка с таким id не найдена'));
    res.send(card);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный _id пользователя'));
      }
    } else {
      next(err);
    }
  }
};
