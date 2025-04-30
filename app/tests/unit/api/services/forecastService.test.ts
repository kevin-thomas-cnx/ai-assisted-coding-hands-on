import { fetchWeeklyForecast } from '../../../../src/services/forecastService';
import { HttpError } from '../../../../src/utils/errors';
import axios from 'axios';

jest.mock('axios');

describe('fetchWeeklyForecast', () => {
    const mockResponse = {
        data: {
            daily: {
                time: ['2025-04-30', '2025-05-01'],
                weather_code: [0, 2],
                temperature_2m_max: [22.5, 24.1],
                temperature_2m_min: [15.3, 16.8],
            },
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should fetch and format the 7-day forecast', async () => {
        (axios.get as jest.Mock).mockResolvedValue(mockResponse);

        const result = await fetchWeeklyForecast(40.7128, -74.006, 'metric');
        expect(result).toEqual({
            latitude: 40.7128,
            longitude: -74.006,
            units: 'metric',
            forecast: [
                {
                    date: '2025-04-30',
                    weather_code: 0,
                    temperature: { max: 22.5, min: 15.3 },
                },
                {
                    date: '2025-05-01',
                    weather_code: 2,
                    temperature: { max: 24.1, min: 16.8 },
                },
            ],
        });
    });

    it('should throw a 503 error if the weather service is unavailable', async () => {
        (axios.get as jest.Mock).mockRejectedValue({ response: { status: 503 } });

        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toBeInstanceOf(HttpError);
        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toHaveProperty('status', 503);
        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toHaveProperty('message', 'Weather service is unavailable.');
    });

    it('should throw a 500 error for other failures', async () => {
        (axios.get as jest.Mock).mockRejectedValue(new Error('Network error'));

        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toBeInstanceOf(HttpError);
        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toHaveProperty('status', 500);
        await expect(fetchWeeklyForecast(40.7128, -74.006, 'metric')).rejects.toHaveProperty('message', 'Failed to fetch weather data.');
    });
});