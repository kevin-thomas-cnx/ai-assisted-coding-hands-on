import express from 'express';
import { getWeeklyForecast } from '../controllers/forecastController';
import { validateQueryParams } from '../../middleware/validateParams';

/**
 * Router for handling forecast-related API routes.
 * 
 * @remarks
 * This router defines the endpoint for fetching the weekly weather forecast.
 */
const router = express.Router();

/**
 * GET /forecast/week
 * 
 * Route to fetch the weekly weather forecast for a given location.
 */
router.get('/forecast/week', validateQueryParams(['latitude', 'longitude']), getWeeklyForecast);

export default router;
