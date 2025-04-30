ls/**
 * Represents an HTTP error with a status code and message.
 */
export class HttpError extends Error {
    /**
     * The HTTP status code associated with the error.
     */
    status: number;

    /**
     * Initializes a new instance of the `HttpError` class.
     * 
     * @param status - The HTTP status code.
     * @param message - The error message.
     */
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}
