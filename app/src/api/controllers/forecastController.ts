import { Request, Response } from 'express';
import { fetchWeeklyForecast } from '../../services/forecastService';
import { handleErrorResponse } from '../../utils/errorHandler';

/**
 * Handles the HTTP request to fetch the weekly weather forecast.
 * 
 * @param req - The HTTP request object containing query parameters:
 *  - `latitude` (required): The latitude of the location.
 *  - `longitude` (required): The longitude of the location.
 *  - `units` (optional): The unit system for temperature ('metric' or 'imperial'). Defaults to 'metric'.
 * @param res - The HTTP response object used to send the forecast data or error messages.
 * @returns A `Promise` that resolves when the response is sent.
 * @throws Will send a 400 status if latitude or longitude is missing.
 * @throws Will send a 503 status if the weather service is unavailable.
 * @throws Will send a 500 status for unexpected errors.
 * @example
 * // Example request:
 * // GET /forecast/week?latitude=40.7128&longitude=-74.0060&units=metric
 * // Example response:
 * // {
 * //   "latitude": 40.7128,
 * //   "longitude": -74.0060,
 * //   "units": "metric",
 * //   "forecast": [...]
 * // }
 */
export const getWeeklyForecast = async (req: Request, res: Response): Promise<void> => {
    const { latitude, longitude, units = 'metric' } = req.query;

    if (!latitude || !longitude) {
        handleErrorResponse(res, 400, 'Latitude and longitude are required.');
        return;
    }

    try {
        const forecast = await fetchWeeklyForecast(
            Number(latitude),
            Number(longitude),
            units as string
        );
        res.status(200).json(forecast);
    } catch (error: any) {
        if (error.status === 503) {
            handleErrorResponse(res, 503, 'Weather service is unavailable.');
        } else {
            handleErrorResponse(res, 500, 'An unexpected error occurred.');
        }
    }
};

