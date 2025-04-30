import { Router } from 'express';
import { LocationController } from '../controllers/locationController';

const router = Router();
const locationController = new LocationController();

router.get('/locations/search', locationController.searchLocations.bind(locationController));

export default router;
