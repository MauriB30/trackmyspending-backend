import { Router } from 'express';
import changePassword from '../controllers/auth/changePassword';
import login from '../controllers/auth/login';
import logout from '../controllers/auth/logout';
import refreshToken from '../controllers/auth/refreshToken';
import register from '../controllers/auth/register';
import { refreshTokenValidation } from '../middleware/authMiddlewares';
import validateBody from '../middleware/validateBody';
import {
    changePasswordSchema,
    LoginSchema,
    RegisterSchema,
} from '../validators/auth.schema';

const authRouter = Router();

authRouter.post('/register', validateBody(RegisterSchema), register);
authRouter.post('/login', validateBody(LoginSchema), login);
authRouter.post('/logout', logout);
authRouter.post('/refresh', refreshTokenValidation, refreshToken);

authRouter.put(
    '/change-password',
    validateBody(changePasswordSchema),
    changePassword
);

export default authRouter;
