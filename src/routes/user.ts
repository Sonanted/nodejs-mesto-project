import { Router } from 'express';

import { createUser, getUserById, getUsers, patchUser, patchUserAvatar } from '../controllers/user';

const router = Router();
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);

export default router;
