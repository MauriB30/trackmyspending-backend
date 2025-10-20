import { Router } from 'express';
import login from '../controllers/auth/login';
import logout from '../controllers/auth/logout';
import refreshToken from '../controllers/auth/refreshToken';
import register from '../controllers/auth/register';
import { refreshTokenValidation } from '../middleware/authMiddlewares';
import validateBody from '../middleware/validateBody';
import { LoginSchema, RegisterSchema } from '../validators/auth.schema';

const authRouter = Router();

authRouter.post('/register', validateBody(RegisterSchema), register);
authRouter.post('/login', validateBody(LoginSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refreshTokenValidation, refreshToken);

export default authRouter;
