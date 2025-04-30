import { LocationService } from '../../../../src/services/locationService';
import * as fs from 'fs';

jest.mock('fs');

describe('LocationService', () => {
    const mockLocations = [
        {
            id: '1',
            name: 'New York',
            type: 'city',
            state: 'NY',
            country: 'USA',
            latitude: 40.7128,
            longitude: -74.006,
            airportCode: 'JFK',
        },
        {
            id: '2',
            name: 'Los Angeles',
            type: 'city',
            state: 'CA',
            country: 'USA',
            latitude: 34.0522,
            longitude: -118.2437,
            airportCode: 'LAX',
        },
        {
            id: '3',
            name: 'San Francisco',
            type: 'city',
            state: 'CA',
            country: 'USA',
            latitude: 37.7749,
            longitude: -122.4194,
            airportCode: null,
        },
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockLocations));
    });

    it('should return matching locations based on name', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('New York');
        expect(result).toEqual([mockLocations[0]]);
    });

    it('should return matching locations based on airport code', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('LAX');
        expect(result).toEqual([mockLocations[1]]);
    });

    it('should return an empty array if no locations match the query', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('Chicago');
        expect(result).toEqual([]);
    });

    it('should perform a case-insensitive search', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('new york');
        expect(result).toEqual([mockLocations[0]]);
    });

    it('should throw a 400 error if the query is missing', async () => {
        const locationService = new LocationService();
        await expect(locationService.searchLocations('')).rejects.toEqual({
            status: 400,
            message: 'Query parameter is missing or invalid.',
        });
    });

});
