import axios, { AxiosError } from 'axios';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches the weekly weather forecast for a given location.
 * 
 * @param latitude - The latitude of the location.
 * @param longitude - The longitude of the location.
 * @param units - The unit system for temperature ('metric' or 'imperial').
 * @returns A `Promise` that resolves to an object containing the forecast data.
 * @throws Will throw an error with status 503 if the weather service is unavailable.
 * @throws Will throw an error with status 500 if the request fails for other reasons.
 * @example
 * const forecast = await fetchWeeklyForecast(40.7128, -74.0060, 'metric');
 * console.log(forecast);
 */
export const fetchWeeklyForecast = async (latitude: number, longitude: number, units: string) => {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                latitude,
                longitude,
                daily: ['temperature_2m_max', 'temperature_2m_min', 'weather_code'],
                timezone: 'auto',
                temperature_unit: units === 'imperial' ? 'fahrenheit' : 'celsius',
            },
        });

        const { daily } = response.data;
        const forecast = daily.time.map((date: string, index: number) => ({
            date,
            weather_code: daily.weather_code[index],
            temperature: {
                max: daily.temperature_2m_max[index],
                min: daily.temperature_2m_min[index],
            },
        }));

        return {
            latitude,
            longitude,
            units,
            forecast,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 503) {
                throw { status: 503, message: 'Weather service is unavailable.' };
            }
        }
        throw { status: 500, message: 'Failed to fetch weather data.' };
    }
};
