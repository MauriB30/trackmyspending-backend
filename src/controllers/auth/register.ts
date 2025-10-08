import { NextFunction, Request, Response } from 'express';
import { appConfig } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';
import { UserModel } from '../../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw AppError.alreadyExists('El email ya está registrado.');
        }

        const newUser = new UserModel({
            name,
            email,
            password,
        });

        await newUser.save();

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: appConfig.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        return res.status(201).json({
            message: 'Usuario registrado con éxito',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            accessToken,
        });
    } catch (error) {
        next(error);
    }
}

export default register;
