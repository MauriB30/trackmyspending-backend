import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
    statusCode: number;
    errors: any;
    code: string;

    constructor(
        message: string = 'Error interno del servidor',
        code: string = 'INTERNAL_ERROR',
        statusCode: number = 500,
        errors: any = null
    ) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.errors = errors;
    }

    static unauthorized(message = 'Credenciales inválidas') {
        return new AppError(message, 'INVALID_CREDENTIALS', 401);
    }

    static tokenExpired(message = 'El token ha expirado') {
        return new AppError(message, 'TOKEN_EXPIRED', 401);
    }

    static alreadyExists(message = 'El recurso ya existe') {
        return new AppError(message, 'RESOURCE_ALREADY_EXISTS', 409);
    }

    static notFound(message = 'Recurso no encontrado') {
        return new AppError(message, 'RESOURCE_NOT_FOUND', 404);
    }

    static validation(errors: { path: string; message: string }[]) {
        return new AppError(
            'Error de validación',
            'VALIDATION_ERROR',
            400,
            errors
        );
    }
}

export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(err);

    return res.status(err.statusCode).json({
        success: false,
        code: err.code,
        message: err.message,
        errors: err.errors,
    });
}
