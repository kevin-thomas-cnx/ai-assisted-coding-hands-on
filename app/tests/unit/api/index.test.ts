import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// Update the MockExpressFactory type definition
type MockExpress = {
    use: jest.Mock;
    listen: jest.Mock;
    disable: jest.Mock;
};

// Use an interface instead of a type to allow for function and property combination
interface MockExpressFactory extends jest.Mock<MockExpress> {
    json: jest.Mock;
    Router: jest.Mock;
}

// Mock forecastRoutes
jest.mock('../../../src/api/routes/forecastRoutes', () => 'forecastRoutesMock');

jest.mock('express', () => {
    const useMock = jest.fn();
    const listenMock = jest.fn().mockImplementation((port, callback) => {
        if (callback) callback();
        return { close: jest.fn() };
    });
    const disableMock = jest.fn();
    
    // Create a Router mock function
    const routerMock = jest.fn().mockReturnValue({
        get: jest.fn(),
        use: jest.fn()
    });

    // Create the express mock function with appropriate structure
    const expressMock: any = jest.fn(() => ({
        use: useMock,
        listen: listenMock,
        disable: disableMock,
    }));

    // Add the json and Router properties
    expressMock.json = jest.fn(() => 'jsonMiddleware');
    expressMock.Router = routerMock;

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
        expect(app.use).toHaveBeenCalledWith('/api/v1', 'forecastRoutesMock');
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
            // Set environment variable
            process.env.PORT = '4000';

            // Reset modules
            jest.resetModules();

            // Create new mocks
            const listenMock = jest.fn().mockImplementation((port, callback) => {
                if (callback) callback();
                return { close: jest.fn() };
            });
            const useMock = jest.fn();
            const disableMock = jest.fn();
            const routerMock = jest.fn().mockReturnValue({
                get: jest.fn(),
                use: jest.fn()
            });

            // Create express mock with the correct structure
            const mockExpressFn: any = jest.fn(() => ({
                use: useMock,
                listen: listenMock,
                disable: disableMock
            }));
            mockExpressFn.json = jest.fn(() => 'jsonMiddleware');
            mockExpressFn.Router = routerMock;

            // Mock the modules
            jest.doMock('express', () => mockExpressFn);
            jest.doMock('fs', () => ({ readFileSync: jest.fn(() => 'yaml-content') }));
            jest.doMock('js-yaml', () => ({ load: jest.fn(() => ({ info: { title: 'API Docs' } })) }));
            jest.doMock('../../../src/api/routes/locationRoutes', () => 'locationRoutesMock');
            jest.doMock('../../../src/api/routes/forecastRoutes', () => 'forecastRoutesMock');

            // Load the index.ts file to run the code
            require('../../../src/index');

            // Test that the correct port was used
            expect(listenMock).toHaveBeenCalledWith("4000", expect.any(Function));
        } finally {
            // Cleanup
            process.env.PORT = originalEnv;
            jest.resetModules();
        }
    });
});
