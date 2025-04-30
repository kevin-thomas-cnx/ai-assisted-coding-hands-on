import { Request, Response, NextFunction } from 'express';
import { handleErrorResponse } from '../utils/errorHandler';

/**
 * Middleware to validate required query parameters.
 * 
 * @param requiredParams - An array of required parameter names.
 */
export const validateQueryParams = (requiredParams: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const missingParams = requiredParams.filter(param => !req.query[param]);

        if (missingParams.length > 0) {
            handleErrorResponse(res, 400, `Missing required parameters: ${missingParams.join(', ')}`);
            return;
        }

        next();
    };
};
