import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Define proper types for mocks
type MockExpress = {
    use: jest.Mock;
    listen: jest.Mock;
};

type MockExpressFactory = jest.Mock<MockExpress> & {
    json: jest.Mock;
};

// Mock dependencies with correct typing
jest.mock('express', () => {
    const useMock = jest.fn();
    const listenMock = jest.fn().mockImplementation((port, callback) => {
        if (callback) callback();
        return { close: jest.fn() };
    });

    const expressMock = jest.fn(() => ({
        use: useMock,
        listen: listenMock
    })) as MockExpressFactory;

    expressMock.json = jest.fn(() => 'jsonMiddleware');
    return expressMock;
});

jest.mock('swagger-ui-express', () => ({
    serve: 'swaggerServe',
    setup: jest.fn(() => 'swaggerSetup')
}));

jest.mock('fs', () => ({
    readFileSync: jest.fn(() => 'yaml-content')
}));

jest.mock('js-yaml', () => ({
    load: jest.fn(() => ({ info: { title: 'API Docs' } }))
}));

jest.mock('../../../src/api/routes/locationRoutes', () => 'locationRoutesMock');

describe('Server Initialization', () => {
    let consoleLogSpy: jest.SpyInstance;
    let app: MockExpress;
    const mockExpress = express as unknown as MockExpressFactory;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Clear module cache to reload index.ts
        jest.isolateModules(() => {
            require('../../../src/index');
        });

        // Get the Express app instance with proper typing
        app = mockExpress();
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
    });

    it('should create an Express application', () => {
        expect(mockExpress).toHaveBeenCalled();
    });

    it('should load OpenAPI specification from file', () => {
        expect(fs.readFileSync).toHaveBeenCalledWith('./specs/swagger.yaml', 'utf8');
        expect(yaml.load).toHaveBeenCalledWith('yaml-content');
    });

    it('should configure JSON middleware', () => {
        expect(mockExpress.json).toHaveBeenCalled();
        expect(app.use).toHaveBeenCalledWith('jsonMiddleware');
    });

    it('should configure Swagger UI', () => {
        expect(app.use).toHaveBeenCalledWith(
            '/api-docs',
            'swaggerServe',
            'swaggerSetup'
        );
        expect(swaggerUi.setup).toHaveBeenCalledWith({ info: { title: 'API Docs' } });
    });

    it('should register API routes', () => {
        expect(app.use).toHaveBeenCalledWith('/api/v1', 'locationRoutesMock');
    });

    it('should start the server on the specified port', () => {
        expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('should log server startup messages', () => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('Server is running at http://localhost:3000')
        );
        expect(consoleLogSpy).toHaveBeenCalledWith(
            expect.stringContaining('API docs available at http://localhost:3000/api-docs')
        );
    });

    it('should use environment port if available', () => {
        // Save original env
        const originalEnv = process.env.PORT;

        try {
            // Reset mocks and modules
            jest.clearAllMocks();
            jest.resetModules();

            // Set environment variable before mocking
            process.env.PORT = '4000';

            // We need to redefine the entire express mock to capture the listen call
            // with the correct port from our environment
            const listenMock = jest.fn().mockImplementation((port, callback) => {
                if (callback) callback();
                return { close: jest.fn() };
            });

            const useMock = jest.fn();

            // Override the express mock specifically for this test
            jest.doMock('express', () => {
                const expressMock = jest.fn(() => ({
                    use: useMock,
                    listen: listenMock
                })) as MockExpressFactory;

                expressMock.json = jest.fn(() => 'jsonMiddleware');
                return expressMock;
            });

            // Now require the index module with our new mock
            jest.isolateModules(() => {
                require('../../../src/index');
            });

            // Check that listen was called with port 4000 as a string
            expect(listenMock).toHaveBeenCalledWith("4000", expect.any(Function));
        } finally {
            // Restore original environment
            process.env.PORT = originalEnv;

            // Clear mocked modules to prevent affecting other tests
            jest.resetModules();
        }
    });
});