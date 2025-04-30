import { LocationService } from '../../../../src/services/locationService';
import * as fs from 'fs';
import * as path from 'path';
import { HttpError } from '../../../../src/utils/errors';

jest.mock('fs');
jest.mock('path');

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
        (path.resolve as jest.Mock).mockReturnValue('/mocked/path');
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockLocations));
    });

    // Existing tests...

    describe('error handling', () => {
        it('should throw a 400 error if the query is missing', async () => {
            const locationService = new LocationService();
            await expect(locationService.searchLocations('')).rejects.toThrow(HttpError);
            await expect(locationService.searchLocations('')).rejects.toMatchObject({
                status: 400,
                message: 'Query parameter is missing or invalid.',
            });
        });

        it('should throw a 400 error if the query is only whitespace', async () => {
            const locationService = new LocationService();
            await expect(locationService.searchLocations('   ')).rejects.toThrow(HttpError);
            await expect(locationService.searchLocations('   ')).rejects.toMatchObject({
                status: 400,
                message: 'Query parameter is missing or invalid.',
            });
        });

        it('should throw a 500 error if the locations file cannot be read', () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('File not found');
            });

            expect(() => new LocationService()).toThrow(HttpError);
            expect(() => new LocationService()).toThrow(expect.objectContaining({
                status: 500,
                message: 'Failed to load locations data.'
            }));
        });

        it('should throw a 500 error if the JSON data is invalid', () => {
            (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

            expect(() => new LocationService()).toThrow(HttpError);
            expect(() => new LocationService()).toThrow(expect.objectContaining({
                status: 500,
                message: 'Failed to parse locations data.'
            }));
        });

        it('should filter locations by name and airport code', async () => {
            const locationService = new LocationService();

            // Test filtering by name
            let results = await locationService.searchLocations('york');
            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('New York');

            // Test filtering by airport code
            results = await locationService.searchLocations('lax');
            expect(results).toHaveLength(1);
            expect(results[0].airportCode).toBe('LAX');

            // Test case insensitivity
            results = await locationService.searchLocations('LoS aNgElEs');
            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('Los Angeles');

            // Test multiple results
            results = await locationService.searchLocations('an');
            expect(results).toHaveLength(2); // Should match both Los Angeles and San Francisco

            // Test location with null airport code doesn't cause errors
            results = await locationService.searchLocations('francisco');
            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('San Francisco');

            // Test no matches
            results = await locationService.searchLocations('nonexistent');
            expect(results).toHaveLength(0);
        });
    });
});