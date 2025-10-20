import { Router } from 'express';
import changePassword from '../controllers/user/changePassword';
import { getUser } from '../controllers/user/getUser';
import { updateUser } from '../controllers/user/updateUser';
import { authenticateUser } from '../middleware/authMiddlewares';
import validateBody from '../middleware/validateBody';
import { changePasswordSchema } from '../validators/auth.schema';
import { userUpdateSchema } from '../validators/user.schema';

const userRoutes = Router();

userRoutes.get('/me', authenticateUser, getUser);
userRoutes.put(
    '/me',
    validateBody(userUpdateSchema),
    authenticateUser,
    updateUser
);
userRoutes.put(
    '/me/change-password',
    validateBody(changePasswordSchema),
    authenticateUser,
    changePassword
);

export default userRoutes;
