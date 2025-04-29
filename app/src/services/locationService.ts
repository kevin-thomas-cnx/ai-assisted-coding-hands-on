import * as fs from 'fs';
import * as path from 'path';

interface Location {
    id: string;
    name: string;
    type: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    airportCode: string | null;
}

export class LocationService {
    private locations: Location[];

    constructor() {
        const dataPath = path.resolve(__dirname, '../../data/locations.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        this.locations = JSON.parse(rawData);
    }

    async searchLocations(query: string): Promise<Location[]> {
        if (!query || query.trim() === '') {
            throw { status: 400, message: 'Query parameter is missing or invalid.' };
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = this.locations.filter(location =>
            location.name.toLowerCase().includes(lowerCaseQuery) ||
            (location.airportCode && location.airportCode.toLowerCase().includes(lowerCaseQuery))
        );

        return results;
    }
}
