import express from 'express';
import { getWeeklyForecast } from '../controllers/forecastController';


const router = express.Router();

router.get('/forecast/week', getWeeklyForecast);

export default router;
