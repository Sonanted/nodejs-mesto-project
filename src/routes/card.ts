import { Router } from 'express';

import {
  addCardLike,
  createCard,
  deleteCardById,
  getCards,
  removeCardLike,
} from '../controllers/card';

const router = Router();
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.post('/', createCard);
router.put('/:cardId/likes', addCardLike);
router.delete('/:cardId/likes', removeCardLike);

export default router;
