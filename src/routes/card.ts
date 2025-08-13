import { Router } from 'express';

import { cardIdValidator, cardValidator } from '../validators/card';

import {
  addCardLike,
  createCard,
  deleteCardById,
  getCards,
  removeCardLike,
} from '../controllers/card';

const router = Router();
router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCardById);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', addCardLike);
router.delete('/:cardId/likes', removeCardLike);

export default router;
