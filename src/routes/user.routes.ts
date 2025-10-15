import { Router } from 'express';
import { getUser } from '../controllers/user/getUser';
import { updateUser } from '../controllers/user/updateUser';
import { authenticateUser } from '../middleware/authMiddlewares';
import validateBody from '../middleware/validateBody';
import { userUpdateSchema } from '../validators/user.schema';

const userRoutes = Router();

userRoutes.get('/me', authenticateUser, getUser);
userRoutes.put(
    '/me',
    validateBody(userUpdateSchema),
    authenticateUser,
    updateUser
);

export default userRoutes;
