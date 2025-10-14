import { Router } from 'express';
import { getUser } from '../controllers/user/getUser';
import { authenticateUser } from '../middleware/authMiddlewares';
import { verifySiteOrigin } from '../middleware/verifySiteOrigin';

const userRoutes = Router();

userRoutes.get('/me', verifySiteOrigin, authenticateUser, getUser);

export default userRoutes;
