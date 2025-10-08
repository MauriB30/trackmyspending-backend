import { Router } from 'express';
import login from '../controllers/auth/login';
import refreshToken from '../controllers/auth/refreshToken';
import register from '../controllers/auth/register';
import { refreshTokenValidation } from '../middleware/authMiddlewares';
import validateBody from '../middleware/validateBody';
import { userLoginSchema, userRegisterSchema } from '../validators/auth.schema';

const authRouter = Router();

authRouter.post('/register', validateBody(userRegisterSchema), register);
authRouter.post('/login', validateBody(userLoginSchema), login);
authRouter.post('/refresh', refreshTokenValidation, refreshToken);

export default authRouter;
