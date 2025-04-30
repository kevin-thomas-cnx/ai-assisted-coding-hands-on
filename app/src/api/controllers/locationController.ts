import { Request, Response } from 'express';
import { LocationService } from '../../services/locationService';
import { HttpError } from '../../utils/errors';

/**
 * Controller for handling location-related API requests.
 */
export class LocationController {
    private readonly locationService: LocationService;

    /**
     * Initializes a new instance of the `LocationController` class.
     */
    constructor() {
        this.locationService = new LocationService();
    }

    /**
     * Handles the HTTP request to search for locations based on a query string.
     * 
     * @param req - The HTTP request object containing the `query` parameter.
     * @param res - The HTTP response object used to send the search results or error messages.
     * @returns A `Promise` that resolves when the response is sent.
     * @throws Will send a 400 status if the query parameter is missing.
     * @throws Will send a 500 status for unexpected errors.
     * @example
     * // Example request:
     * // GET /locations/search?query=New York
     * // Example response:
     * // {
     * //   "locations": [...]
     * // }
     */
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
