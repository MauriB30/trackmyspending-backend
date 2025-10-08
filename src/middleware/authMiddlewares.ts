import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Types } from 'mongoose';
import { verifyAccessToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from './errorHandler';

export function refreshTokenValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw AppError.unauthorized(
            'No se ha proporcionado un token de refresco.'
        );
    }

    try {
        const jwtPayload = verifyRefreshToken(refreshToken) as {
            userId: Types.ObjectId;
        };

        req.userId = jwtPayload.userId;

        next();
    } catch (error) {
        if (
            error instanceof TokenExpiredError ||
            error instanceof JsonWebTokenError
        ) {
            next(
                AppError.unauthorized('Token de refresco inválido o expirado.')
            );
        }
    }
}

export function authenticateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        throw AppError.unauthorized(
            'No se ha proporcionado un token de acceso.'
        );
    }

    try {
        const jwtPayload = verifyAccessToken(accessToken) as {
            userId: Types.ObjectId;
        };

        req.userId = jwtPayload.userId;
        next();
    } catch (error) {
        if (
            error instanceof TokenExpiredError ||
            error instanceof JsonWebTokenError
        ) {
            next(
                AppError.unauthorized('Token de accesso inválido o expirado.')
            );
        }
    }
}
