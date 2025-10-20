import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../middleware/errorHandler';
import { UserModel } from '../../models/user.model';

async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { password, newPassword } = req.body;

        const { userId } = req;

        const user = await UserModel.findById(userId).select('password');

        if (!user) {
            throw AppError.notFound('Usuario no encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw AppError.alreadyExists('Contraseña actual incorrecta');
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Contraseña actualizada exitosamente',
        });
    } catch (error) {
        next(error);
    }
}

export default changePassword;
