import { Request, Response } from 'express';
import { tokenModel } from '../../models/token.model';

async function logout(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        await tokenModel.deleteOne({ token: refreshToken });
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
    });

    return res.status(200).json({
        success: true,
        message: 'Sesión cerrada exitosamente.',
    });
}

export default logout;
