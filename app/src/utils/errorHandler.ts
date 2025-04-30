import { Response } from 'express';

/**
 * Sends a standardized error response.
 * 
 * @param res - The HTTP response object.
 * @param status - The HTTP status code.
 * @param message - The error message.
 */
export const handleErrorResponse = (res: Response, status: number, message: string): void => {
    res.status(status).json({ error: message });
};
