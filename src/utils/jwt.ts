import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { appConfig } from '../config/env';

export function generateAccessToken(userId: Types.ObjectId) {
    const token = jwt.sign({ userId }, appConfig.JWT_ACCESS_SECRET, {
        expiresIn: appConfig.ACCESS_TOKEN_EXPIRY,
        subject: 'accessApi',
    });

    return token;
}

export function generateRefreshToken(userId: Types.ObjectId) {
    const refreshToken = jwt.sign({ userId }, appConfig.JWT_REFRESH_SECRET, {
        expiresIn: appConfig.REFRESH_TOKEN_EXPIRY,
        subject: 'refreshToken',
    });

    return refreshToken;
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, appConfig.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
    return jwt.verify(token, appConfig.JWT_REFRESH_SECRET);
}
