import { Router } from 'express';
import { getUser } from '../controllers/user/getUser';
import { authenticateUser } from '../middleware/authMiddlewares';

const userRoutes = Router();

userRoutes.get('/me', authenticateUser, getUser);

export default userRoutes;
