import { Router } from 'express';
import { LocationController } from '../controllers/locationController';
import { validateQueryParams } from '../../middleware/validateParams';

/**
 * Router for handling location-related API routes.
 * 
 * @remarks
 * This router defines the endpoint for searching locations.
 */
const router = Router();
const locationController = new LocationController();

/**
 * GET /locations/search
 * 
 * Route to search for locations based on a query string.
 */
router.get('/locations/search', validateQueryParams(['query']), locationController.searchLocations.bind(locationController));

export default router;
