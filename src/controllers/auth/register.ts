import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../middleware/errorHandler';
import { UserModel } from '../../models/user.model';

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

        return res.status(201).json({
            message: 'Usuario registrado con éxito',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
}

export default register;
