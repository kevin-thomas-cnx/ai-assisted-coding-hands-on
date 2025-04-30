import * as fs from 'fs';
import * as path from 'path';
import { HttpError } from '../utils/errors';

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

export class LocationService {
    private readonly locations: Location[];

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
