// tests/unit/api/controllers/locationController.test.ts
import { LocationController } from '../../../../src/api/controllers/locationController';
import { LocationService } from '../../../../src/services/locationService';
import { Request, Response } from 'express';

// Mock LocationService
jest.mock('../../../../src/services/locationService');

describe('LocationController', () => {
    let controller: LocationController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonSpy: jest.Mock;
    let statusSpy: jest.Mock;

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        // Setup response spies
        jsonSpy = jest.fn();
        statusSpy = jest.fn().mockReturnValue({ json: jsonSpy });

        mockResponse = {
            status: statusSpy,
            json: jsonSpy
        };

        controller = new LocationController();
    });

    it('should return 400 if query parameter is missing', async () => {
        mockRequest = {
            query: {}
        };

        await controller.searchLocations(mockRequest as Request, mockResponse as Response);

        expect(statusSpy).toHaveBeenCalledWith(400);
        expect(jsonSpy).toHaveBeenCalledWith({ error: 'Query parameter is required' });
    });

    it('should return locations when query is provided', async () => {
        const mockLocations = [
            {
                id: '1',
                name: 'New York',
                type: 'city',
                state: 'NY',
                country: 'USA',
                latitude: 40.7128,
                longitude: -74.006
            }
        ];
        const mockSearchFn = jest.spyOn(LocationService.prototype, 'searchLocations')
            .mockResolvedValue(mockLocations);

        mockRequest = {
            query: { query: 'New York' }
        };

        await controller.searchLocations(mockRequest as Request, mockResponse as Response);

        expect(mockSearchFn).toHaveBeenCalledWith('New York');
        expect(statusSpy).toHaveBeenCalledWith(200);
        expect(jsonSpy).toHaveBeenCalledWith({ locations: mockLocations });
    });

    it('should return 500 if an error occurs', async () => {
        jest.spyOn(LocationService.prototype, 'searchLocations')
            .mockRejectedValue(new Error('Test error'));

        mockRequest = {
            query: { query: 'New York' }
        };

        await controller.searchLocations(mockRequest as Request, mockResponse as Response);

        expect(statusSpy).toHaveBeenCalledWith(500);
        expect(jsonSpy).toHaveBeenCalledWith({ error: 'An unexpected error occurred' });
    });
});