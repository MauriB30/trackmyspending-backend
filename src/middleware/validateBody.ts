import { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { AppError } from './errorHandler';

function validateBody(schema: z.ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const issues = error.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message,
                }));
                return next(AppError.validation(issues));
            }
            next(error);
        }
    };
}

export default validateBody;
