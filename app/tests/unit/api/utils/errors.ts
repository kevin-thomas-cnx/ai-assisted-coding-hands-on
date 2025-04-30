import { HttpError } from '../../../../src/utils/errors';

describe('HttpError', () => {
    it('should create an instance with the correct properties', () => {
        const error = new HttpError(404, 'Not Found');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HttpError);
        expect(error.status).toBe(404);
        expect(error.message).toBe('Not Found');
        expect(error.name).toBe('HttpError');
    });

    it('should work with different status codes and messages', () => {
        const testCases = [
            { status: 400, message: 'Bad Request' },
            { status: 401, message: 'Unauthorized' },
            { status: 500, message: 'Internal Server Error' }
        ];

        testCases.forEach(({ status, message }) => {
            const error = new HttpError(status, message);
            expect(error.status).toBe(status);
            expect(error.message).toBe(message);
        });
    });

    it('should maintain instanceof Error for proper error handling', () => {
        const error = new HttpError(403, 'Forbidden');

        // This ensures your error can be caught in catch blocks expecting Error
        expect(error instanceof Error).toBe(true);
    });
});