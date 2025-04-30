import { Request, Response } from 'express';
import { LocationService } from '../../services/locationService';
import { HttpError } from '../../utils/errors';

export class LocationController {
    private readonly locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    async searchLocations(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.query as string;

            if (!query) {
                res.status(400).json({ error: 'Query parameter is required' });
                return;
            }

            const locations = await this.locationService.searchLocations(query);
            res.status(200).json({ locations });
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }
}
