import { Router } from 'express';

import { avatarValidator, patchUserValidator, userIdValidator } from '../validators/user';

import {
  createUser,
  getActiveUser,
  getUserById,
  getUsers,
  patchUser,
  patchUserAvatar,
} from '../controllers/user';

const router = Router();
router.get('/', getUsers);
router.get('/me', getActiveUser);
router.get('/:userId', userIdValidator, getUserById);
router.patch('/me', patchUserValidator, patchUser);
router.patch('/me/avatar', avatarValidator, patchUserAvatar);

export default router;
