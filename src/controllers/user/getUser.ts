import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../middleware/errorHandler';
import { UserModel } from '../../models/user.model';

export async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req;

        const user = await UserModel.findById(userId).select('name');

        if (!user) {
            throw AppError.notFound('Usuario no encontrado');
        }

        res.status(200).json({
            id: user._id,
            name: user.name,
        });
    } catch (error) {
        next(error);
    }
}
