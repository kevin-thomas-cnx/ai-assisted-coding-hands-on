// tests/unit/api/routes/locationRoutes.test.ts
import { Router } from 'express';
import { LocationController } from '../../../../src/api/controllers/locationController';
import { Router as ExpressRouter } from 'express';

// Set up mock functions
const getMock = jest.fn();
const bindMock = jest.fn().mockReturnValue('boundSearchLocations');

// Mock Express Router
jest.mock('express', () => ({
    Router: jest.fn(() => ({
        get: getMock
    }))
}));

// Mock LocationController with a properly bound searchLocations method
const controllerMock = { searchLocations: { bind: bindMock } };
jest.mock('../../../../src/api/controllers/locationController', () => ({
    LocationController: jest.fn().mockImplementation(() => controllerMock)
}));

describe('Location Routes', () => {
    let locationRoutes: ExpressRouter;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();

        // Import the module under test
        jest.isolateModules(() => {
            locationRoutes = require('../../../../src/api/routes/locationRoutes').default;
        });
    });

    it('should initialize a router', () => {
        expect(Router).toHaveBeenCalled();
        expect(locationRoutes).toBeDefined();
    });

    it('should create an instance of LocationController', () => {
        expect(LocationController).toHaveBeenCalledTimes(1);
    });

    it('should register the search route with the correct path', () => {
        expect(getMock).toHaveBeenCalledWith(
            '/locations/search',
            'boundSearchLocations'
        );
    });

    it('should bind the controller method to maintain context', () => {
        expect(bindMock).toHaveBeenCalledWith(controllerMock);
    });
});