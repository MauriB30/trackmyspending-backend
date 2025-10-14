import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';
import { tokenModel } from '../../models/token.model';
import { UserModel } from '../../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email })
            .select('name email password')
            .lean();

        if (!user) {
            throw AppError.unauthorized('Email o contraseña incorrectos.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw AppError.unauthorized('Email o contraseña incorrectos.');
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        await tokenModel.create({ token: refreshToken, userId: user._id });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso.',
            user: {
                id: user._id,
                name: user.name,
            },
        });
    } catch (error) {
        next(error);
    }
}

export default login;
