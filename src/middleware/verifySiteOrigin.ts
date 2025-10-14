import { NextFunction, Request, Response } from 'express';
import { AppError } from './errorHandler';

export function verifySiteOrigin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const secFetchSite = req.headers['sec-fetch-site'];
    console.log(secFetchSite);

    if (secFetchSite === 'same-origin' || secFetchSite === 'same-site') {
        next();
    }

    throw AppError.forbidden();
}
