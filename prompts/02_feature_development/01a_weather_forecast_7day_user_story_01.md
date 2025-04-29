## Basic 7 Day Weather Forecast

### **Overview**

Create a REST API endpoint that provides a 7-day weather forecast based on a specified location, returning weather conditions and temperature ranges in a simple, easy-to-consume JSON format.

### **User Story**

**AS A** developer using the weather service API  
**I WANT TO** retrieve a 7-day weather forecast for a specific location  
**SO THAT** I can display concise weather information in my application

### **Acceptance Criteria**

1. **Request Parameters:**
    * Accept `latitude`, `longitude`, and `units` as parameters.
2. **Response Data:**
    * Return a payload with the location details.
    * Include 7 days of forecast data, where each day contains:
        * The date
        * The weather code indicating the general condition
        * An object for temperature with maximum (`max`) and minimum (`min`) values
3. **Data Format:**
    * Provide the response in JSON format.
4. **Error Handling:**
    * Validate inputs and return appropriate error codes (e.g., 400 for invalid coordinates).
    * Provide meaningful error messages in case of API failures.
5. **Performance:**
    * Ensure a response time below 500ms.
    * Support at least 50 requests per second.
    * Maintain 99.9% uptime.

### **Technical Specifications**

API Endpoint

```
GET /api/v1/forecast/week?latitude={lat}&longitude={lon}&units={units}
```

Sample API Request

```
GET /api/v1/forecast/week?latitude=40.7128&longitude=-74.0060&units=metric
```

Sample Response Format

```

{
 "latitude": 40.7128,
 "longitude": -74.0060,
 "units": "metric",
 "forecast": [
   {
     "date": "2025-04-30",
     "weather_code": 0,
     "temperature": {
       "max": 22.5,
       "min": 15.3
     }
   },
   {
     "date": "2025-05-01",
     "weather_code": 2,
     "temperature": {
       "max": 24.1,
       "min": 16.8
     }
   },
   {
     "date": "2025-05-02",
     "weather_code": 45,
     "temperature": {
       "max": 20.0,
       "min": 14.5
     }
   },
   {
     "date": "2025-05-03",
     "weather_code": 71,
     "temperature": {
       "max": 18.2,
       "min": 12.1
     }
   },
   {
     "date": "2025-05-04",
     "weather_code": 3,
     "temperature": {
       "max": 21.5,
       "min": 14.9
     }
   },
   {
     "date": "2025-05-05",
     "weather_code": 0,
     "temperature": {
       "max": 25.0,
       "min": 17.0
     }
   },
   {
     "date": "2025-05-06",
     "weather_code": 1,
     "temperature": {
       "max": 26.3,
       "min": 18.5
     }
   }
 ]
}
```

Weather Code Mapping

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

### **Dependencies**

* Open-Meteo API Integration
* Error Handling Middleware
* API Documentation (OpenAPI/Swagger)

### **Error Handling Rules**

The API will handle errors gracefully by returning:

* 400 Bad Request for invalid latitude/longitude
* 503 Service Unavailable if external weather service is down
* Detailed JSON error messages for consumer troubleshooting