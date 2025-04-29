import { Request, Response } from 'express';
import { fetchWeeklyForecast } from '../../services/forecastService';

export const getWeeklyForecast = async (req: Request, res: Response): Promise<void> => {
    const { latitude, longitude, units = 'metric' } = req.query;

    if (!latitude || !longitude) {
        res.status(400).json({ error: 'Latitude and longitude are required.' });
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
            res.status(503).json({ error: 'Weather service is unavailable.' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
};