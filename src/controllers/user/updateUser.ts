import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../middleware/errorHandler';
import { UserModel } from '../../models/user.model';

export async function updateUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { userId } = req;

        const { name, email } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            throw AppError.notFound('Usuario no encontrado');
        }

        if (email !== user.email) {
            const emailExists = await UserModel.exists({ email });
            if (emailExists) {
                throw AppError.alreadyExists('El email ya está registrado');
            }
        }

        user.name = name;

        user.email = email;

        await user.save();

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        next(error);
    }
}
