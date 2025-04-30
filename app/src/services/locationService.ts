import * as fs from 'fs';
import * as path from 'path';
import { HttpError } from '../utils/errors';

/**
 * Represents a location with geographical and optional airport information.
 */
interface Location {
    id: string;
    name: string;
    type: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    airportCode?: string | null;
}

/**
 * Service for managing and searching location data.
 */
export class LocationService {
    private readonly locations: Location[];

    /**
     * Initializes a new instance of the `LocationService` class.
     * 
     * @throws Will throw an `HttpError` if the locations data cannot be loaded or parsed.
     */
    constructor() {
        try {
            const dataPath = path.resolve(__dirname, '../../data/locations.json');
            const rawData = fs.readFileSync(dataPath, 'utf8');
            this.locations = JSON.parse(rawData);
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new HttpError(500, 'Failed to parse locations data.');
            } else {
                throw new HttpError(500, 'Failed to load locations data.');
            }
        }
    }

    /**
     * Searches for locations that match the given query string.
     * 
     * @param query - The search query string.
     * @returns A `Promise` that resolves to an array of matching locations.
     * @throws Will throw an `HttpError` with status 400 if the query is invalid.
     * @example
     * const results = await locationService.searchLocations('New York');
     * console.log(results);
     */
    async searchLocations(query: string): Promise<Location[]> {
        if (!query || query.trim() === '') {
            throw new HttpError(400, 'Query parameter is missing or invalid.');
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = this.locations.filter(location =>
            location.name.toLowerCase().includes(lowerCaseQuery) ||
            (location.airportCode?.toLowerCase().includes(lowerCaseQuery))
        );

        return results;
    }
}
