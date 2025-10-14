import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';
import { tokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

async function refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        const { userId } = req;

        const storedToken = await tokenModel.exists({ token: oldRefreshToken });

        if (!storedToken) {
            throw AppError.tokenExpired(
                'Token de refresco inválido o expirado.'
            );
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            throw AppError.tokenExpired('Token de refresco inválido.');
        }

        await tokenModel.deleteOne({ token: oldRefreshToken });

        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        await tokenModel.create({
            userId: user._id,
            token: newRefreshToken,
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: 'Token renovado exitosamente.',
        });
    } catch (error) {
        next(error);
    }
}

export default refreshToken;
