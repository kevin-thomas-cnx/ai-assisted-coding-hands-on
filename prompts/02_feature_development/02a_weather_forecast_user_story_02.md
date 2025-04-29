# Daily Weather Forecast

## **Overview**

Create a REST API endpoint that provides detailed weather information for the current day, including current conditions and hourly forecasts, presented in an easy-to-consume JSON format.

## **User Story**

**AS A** developer using the weather service API**I WANT TO** retrieve detailed weather information for today at a specific location**SO THAT** I can display comprehensive current day weather information in my application

## **Acceptance Criteria**

1. **Request Parameters:**
   * Accept `latitude`, `longitude`, and `units` as parameters
   * No additional complexity in the request
2. **Response Data:**
   * Return current conditions
   * Include hourly forecasts for the full day
   * Provide detailed weather information including:
      * Temperature
      * Weather conditions
      * Wind speed and direction
      * Precipitation probability and amount
      * Humidity
3. **Data Format:**
   * Provide the response in JSON format
   * Organize data into clear sections for current and hourly data
4. **Error Handling:**
   * Validate inputs and return appropriate error codes
   * Provide meaningful error messages
   * Handle timezone edge cases appropriately
5. **Performance:**
   * Ensure response time below 500ms
   * Support at least 50 requests per second
   * Maintain 99.9% uptime

## **Technical Specifications**

### **API Endpoint**

```
GET /api/v1/forecast/today?latitude={lat}&longitude={lon}&units={units}
```

### **Sample Response Format**

```

{
 "latitude": 40.7128,
 "longitude": -74.0060,
 "units": "metric",
 "date": "2025-04-30",
 "current": {
   "time": "2025-04-30T14:30:00",
   "temperature": 18.3,
   "feels_like": 17.8,
   "weather_code": 1,
   "description": "Mainly clear",
   "wind_speed": 12.5,
   "wind_direction": 280,
   "humidity": 65,
   "precipitation_probability": 0
 },
 "hourly": [
   {
     "time": "2025-04-30T00:00:00",
     "temperature": 15.5,
     "feels_like": 15.0,
     "weather_code": 0,
     "description": "Clear sky",
     "wind_speed": 8.2,
     "wind_direction": 275,
     "humidity": 75,
     "precipitation_probability": 0,
     "precipitation_amount": 0
   },
   {
     "time": "2025-04-30T01:00:00",
     "temperature": 15.0,
     "feels_like": 14.5,
     "weather_code": 0,
     "description": "Clear sky",
     "wind_speed": 7.8,
     "wind_direction": 270,
     "humidity": 78,
     "precipitation_probability": 0,
     "precipitation_amount": 0
   }
   // Additional hourly entries...
 ],
 "summary": {
   "temperature": {
     "max": 22.5,
     "min": 15.0
   },
   "sunrise": "2025-04-30T05:45:00",
   "sunset": "2025-04-30T19:50:00"
 }
}
```

### **Weather Code Mapping**

```

const WEATHER_CODES = {
 0: 'Clear sky',
 1: 'Mainly clear',
 2: 'Partly cloudy',
 3: 'Overcast',
 45: 'Fog',
 48: 'Depositing rime fog',
 51: 'Light drizzle',
 53: 'Moderate drizzle',
 55: 'Dense drizzle',
 56: 'Light freezing drizzle',
 57: 'Dense freezing drizzle',
 61: 'Slight rain',
 63: 'Moderate rain',
 65: 'Heavy rain',
 66: 'Light freezing rain',
 67: 'Heavy freezing rain',
 71: 'Slight snow fall',
 73: 'Moderate snow fall',
 75: 'Heavy snow fall',
 77: 'Snow grains',
 80: 'Slight rain showers',
 81: 'Moderate rain showers',
 82: 'Violent rain showers',
 85: 'Slight snow showers',
 86: 'Heavy snow showers',
 95: 'Slight or moderate thunderstorm',
 96: 'Thunderstorm with slight hail',
 99: 'Thunderstorm with heavy hail'
};
```

## **Dependencies**

* Open-Meteo API Integration
* Error Handling Middleware
* API Documentation (OpenAPI/Swagger)

## **Error Handling Rules**

The API will handle errors gracefully by returning:

* 400 Bad Request for invalid latitude/longitude
* 503 Service Unavailable if external weather service is down
* Detailed JSON error messages for consumer troubleshooting

### **Sample Error Response**

```

{
 "error": {
   "code": "INVALID_COORDINATES",
   "message": "Latitude must be between -90 and 90 degrees",
   "status": 400
 }
}
```

## **Business Rules**

1. **Time Handling:**
   * All times returned in user's timezone (derived from coordinates)
   * Handle day boundary cases (e.g., current time near midnight)
   * Ensure complete day of hourly data regardless of request time

