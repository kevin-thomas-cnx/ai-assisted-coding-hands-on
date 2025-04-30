You are an expert software engineer. I need to extend an existing API codebase with new functionality. Here are the key components:

##  **Core Components**

### **1. New Feature Requirements**

-------
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
-------

### **2. API Specification**

-------
openapi: 3.0.0
info:
  title: Open-Meteo APIs
  description: 'Open-Meteo offers free weather forecast APIs for open-source developers and non-commercial use. No API key is required.'
  version: '1.0'
  contact:
    name: Open-Meteo
    url: https://open-meteo.com
    email: info@open-meteo.com
  license:
    name: Attribution 4.0 International (CC BY 4.0)
    url: https://creativecommons.org/licenses/by/4.0/
  termsOfService: https://open-meteo.com/en/features#terms
paths:
  /v1/forecast:
    servers:
      - url: https://api.open-meteo.com
    get:
      tags:
        - Weather Forecast APIs
      summary: 7 day weather forecast for coordinates
      description: 7 day weather variables in hourly and daily resolution for given WGS84 latitude and longitude coordinates. Available worldwide.
      parameters:
        - name: hourly
          in: query
          explode: false
          schema:
            type: array
            items:
              type: string
              enum:
                - temperature_2m
                - relative_humidity_2m
                - dew_point_2m
                - apparent_temperature
                - pressure_msl
                - cloud_cover
                - cloud_cover_low
                - cloud_cover_mid
                - cloud_cover_high
                - wind_speed_10m
                - wind_speed_80m
                - wind_speed_120m
                - wind_speed_180m
                - wind_direction_10m
                - wind_direction_80m
                - wind_direction_120m
                - wind_direction_180m
                - wind_gusts_10m
                - shortwave_radiation
                - direct_radiation
                - direct_normal_irradiance
                - diffuse_radiation
                - vapour_pressure_deficit
                - evapotranspiration
                - precipitation
                - weather_code
                - snow_height
                - freezing_level_height
                - soil_temperature_0cm
                - soil_temperature_6cm
                - soil_temperature_18cm
                - soil_temperature_54cm
                - soil_moisture_0_1cm
                - soil_moisture_1_3cm
                - soil_moisture_3_9cm
                - soil_moisture_9_27cm
                - soil_moisture_27_81cm
        - name: daily
          in: query
          schema:
            type: array
            items:
              type: string
              enum:
                - temperature_2m_max
                - temperature_2m_min
                - apparent_temperature_max
                - apparent_temperature_min
                - precipitation_sum
                - precipitation_hours
                - weather_code
                - sunrise
                - sunset
                - wind_speed_10m_max
                - wind_gusts_10m_max
                - wind_direction_10m_dominant
                - shortwave_radiation_sum
                - uv_index_max
                - uv_index_clear_sky_max
                - et0_fao_evapotranspiration
        - name: latitude
          in: query
          required: true
          description: "WGS84 coordinate"
          schema:
            type: number
            format: double
        - name: longitude
          in: query
          required: true
          description: "WGS84 coordinate"
          schema:
            type: number
            format: double
        - name: current_weather
          in: query
          schema:
            type: boolean
        - name: temperature_unit
          in: query
          schema:
            type: string
            default: celsius
            enum:
              - celsius
              - fahrenheit
        - name: wind_speed_unit
          in: query
          schema:
            type: string
            default: kmh
            enum:
              - kmh
              - ms
              - mph
              - kn
        - name: timeformat
          in: query
          description: If format `unixtime` is selected, all time values are returned in UNIX epoch time in seconds. Please not that all time is then in GMT+0! For daily values with unix timestamp, please apply `utc_offset_seconds` again to get the correct date.
          schema:
            type: string
            default: iso8601
            enum:
              - iso8601
              - unixtime
        - name: timezone
          in: query
          description: If `timezone` is set, all timestamps are returned as local-time and data is returned starting at 0:00 local-time. Any time zone name from the [time zone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) is supported.
          schema:
            type: string
        - name: past_days
          in: query
          description: If `past_days` is set, yesterdays or the day before yesterdays data are also returned.
          schema:
            type: integer
            enum:
              - 1
              - 2
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  latitude:
                    type: number
                    example: 52.52
                    description: WGS84 of the center of the weather grid-cell which was used to generate this forecast. This coordinate might be up to 5 km away.
                  longitude:
                    type: number
                    example: 13.419.52
                    description: WGS84 of the center of the weather grid-cell which was used to generate this forecast. This coordinate might be up to 5 km away.
                  elevation:
                    type: number
                    example: 44.812
                    description: The elevation in meters of the selected weather grid-cell. In mountain terrain it might differ from the location you would expect.
                  generationtime_ms:
                    type: number
                    example: 2.2119
                    description: Generation time of the weather forecast in milli seconds. This is mainly used for performance monitoring and improvements.
                  utc_offset_seconds:
                    type: integer
                    example: 3600
                    description: Applied timezone offset from the &timezone= parameter.
                  hourly:
                    $ref: "#/components/schemas/HourlyResponse"
                  hourly_units:
                    type: object
                    additionalProperties:
                      type: string
                    description: For each selected weather variable, the unit will be listed here.
                  daily:
                    $ref: "#/components/schemas/DailyResponse"
                  daily_units:
                    type: object
                    additionalProperties:
                      type: string
                    description: For each selected daily weather variable, the unit will be listed here.
                  current_weather:
                    $ref: "#/components/schemas/CurrentWeather"
        "400":
          description: Bad Request
          content:
            application/json:
              schema:
                type: object
                properties:
                  error:
                    type: boolean
                    description: Always set true for errors
                  reason:
                    type: string
                    description: Description of the error
                    example: "Latitude must be in range of -90 to 90°. Given: 300"
components:
  schemas:
    HourlyResponse:
      type: object
      description: For each selected weather variable, data will be returned as a floating point array. Additionally a `time` array will be returned with ISO8601 timestamps.
      required:
        - time
      properties:
        time:
          type: array
          items:
            type: string
        temperature_2m:
          type: array
          items:
            type: number
        relative_humidity_2m:
          type: array
          items:
            type: number
        dew_point_2m:
          type: array
          items:
            type: number
        apparent_temperature:
          type: array
          items:
            type: number
        pressure_msl:
          type: array
          items:
            type: number
        cloud_cover:
          type: array
          items:
            type: number
        cloud_cover_low:
          type: array
          items:
            type: number
        cloud_cover_mid:
          type: array
          items:
            type: number
        cloud_cover_high:
          type: array
          items:
            type: number
        wind_speed_10m:
          type: array
          items:
            type: number
        wind_speed_80m:
          type: array
          items:
            type: number
        wind_speed_120m:
          type: array
          items:
            type: number
        wind_speed_180m:
          type: array
          items:
            type: number
        wind_direction_10m:
          type: array
          items:
            type: number
        wind_direction_80m:
          type: array
          items:
            type: number
        wind_direction_120m:
          type: array
          items:
            type: number
        wind_direction_180m:
          type: array
          items:
            type: number
        wind_gusts_10m:
          type: array
          items:
            type: number
        shortwave_radiation:
          type: array
          items:
            type: number
        direct_radiation:
          type: array
          items:
            type: number
        direct_normal_irradiance:
          type: array
          items:
            type: number
        diffuse_radiation:
          type: array
          items:
            type: number
        vapour_pressure_deficit:
          type: array
          items:
            type: number
        evapotranspiration:
          type: array
          items:
            type: number
        precipitation:
          type: array
          items:
            type: number
        weather_code:
          type: array
          items:
            type: number
        snow_height:
          type: array
          items:
            type: number
        freezing_level_height:
          type: array
          items:
            type: number
        soil_temperature_0cm:
          type: array
          items:
            type: number
        soil_temperature_6cm:
          type: array
          items:
            type: number
        soil_temperature_18cm:
          type: array
          items:
            type: number
        soil_temperature_54cm:
          type: array
          items:
            type: number
        soil_moisture_0_1cm:
          type: array
          items:
            type: number
        soil_moisture_1_3cm:
          type: array
          items:
            type: number
        soil_moisture_3_9cm:
          type: array
          items:
            type: number
        soil_moisture_9_27cm:
          type: array
          items:
            type: number
        soil_moisture_27_81cm:
          type: array
          items:
            type: number
    DailyResponse:
      type: object
      description: For each selected daily weather variable, data will be returned as a floating point array. Additionally a `time` array will be returned with ISO8601 timestamps.
      properties:
        time:
          type: array
          items:
            type: string
        temperature_2m_max:
          type: array
          items:
            type: number
        temperature_2m_min:
          type: array
          items:
            type: number
        apparent_temperature_max:
          type: array
          items:
            type: number
        apparent_temperature_min:
          type: array
          items:
            type: number
        precipitation_sum:
          type: array
          items:
            type: number
        precipitation_hours:
          type: array
          items:
            type: number
        weather_code:
          type: array
          items:
            type: number
        sunrise:
          type: array
          items:
            type: number
        sunset:
          type: array
          items:
            type: number
        wind_speed_10m_max:
          type: array
          items:
            type: number
        wind_gusts_10m_max:
          type: array
          items:
            type: number
        wind_direction_10m_dominant:
          type: array
          items:
            type: number
        shortwave_radiation_sum:
          type: array
          items:
            type: number
        uv_index_max:
          type: array
          items:
            type: number
        uv_index_clear_sky_max:
          type: array
          items:
            type: number
        et0_fao_evapotranspiration:
          type: array
          items:
            type: number
      required:
        - time
    CurrentWeather:
      type: object
      description: "Current weather conditions with the attributes: time, temperature, wind_speed, wind_direction and weather_code"
      properties:
        time:
          type: string
        temperature:
          type: number
        wind_speed:
          type: number
        wind_direction:
          type: number
        weather_code:
          type: integer
      required:
        - time
        - temperature
        - wind_speed
        - wind_direction
        - weather_code

-------

### **3. Existing Codebase**

-------
================
File: app/src/api/controllers/locationController.ts
================
import { Request, Response } from 'express';
import { LocationService } from '../../services/locationService';

export class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    async searchLocations(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.query as string;

            if (!query) {
                res.status(400).json({ error: 'Query parameter is required' });
                return;
            }

            const locations = await this.locationService.searchLocations(query);
            res.status(200).json({ locations });
        } catch (error) {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}

================
File: app/src/api/routes/locationRoutes.ts
================
import { Router } from 'express';
import { LocationController } from '../controllers/locationController';

const router = Router();
const locationController = new LocationController();

router.get('/locations/search', locationController.searchLocations.bind(locationController));

export default router;

================
File: app/src/services/locationService.ts
================
import * as fs from 'fs';
import * as path from 'path';

interface Location {
    id: string;
    name: string;
    type: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
    airportCode: string | null;
}

export class LocationService {
    private locations: Location[];

    constructor() {
        const dataPath = path.resolve(__dirname, '../../data/locations.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        this.locations = JSON.parse(rawData);
    }

    async searchLocations(query: string): Promise<Location[]> {
        if (!query || query.trim() === '') {
            throw { status: 400, message: 'Query parameter is missing or invalid.' };
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = this.locations.filter(location =>
            location.name.toLowerCase().includes(lowerCaseQuery) ||
            (location.airportCode && location.airportCode.toLowerCase().includes(lowerCaseQuery))
        );

        return results;
    }
}

================
File: app/src/index.ts
================
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import locationRoutes from './api/routes/locationRoutes';

const app: Express = express();
const port = process.env.PORT || 3000;

// Load OpenAPI specification
const openApiSpec = yaml.load(fs.readFileSync('./specs/openai.yaml', 'utf8')) as object;

app.use(express.json());

// Serve API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Register routes
app.use('/api/v1', locationRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    console.log(`📚[docs]: API docs available at http://localhost:${port}/api-docs`);
});

================
File: app/tests/unit/locationService.test.ts
================
import { LocationService } from '../../src/services/locationService';
import * as fs from 'fs';

jest.mock('fs');

describe('LocationService', () => {
    const mockLocations = [
        {
            id: '1',
            name: 'New York',
            type: 'city',
            state: 'NY',
            country: 'USA',
            latitude: 40.7128,
            longitude: -74.006,
            airportCode: 'JFK',
        },
        {
            id: '2',
            name: 'Los Angeles',
            type: 'city',
            state: 'CA',
            country: 'USA',
            latitude: 34.0522,
            longitude: -118.2437,
            airportCode: 'LAX',
        },
        {
            id: '3',
            name: 'San Francisco',
            type: 'city',
            state: 'CA',
            country: 'USA',
            latitude: 37.7749,
            longitude: -122.4194,
            airportCode: null,
        },
    ];

    beforeEach(() => {
        jest.resetAllMocks();
        (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockLocations));
    });

    it('should return matching locations based on name', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('New York');
        expect(result).toEqual([mockLocations[0]]);
    });

    it('should return matching locations based on airport code', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('LAX');
        expect(result).toEqual([mockLocations[1]]);
    });

    it('should return an empty array if no locations match the query', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('Chicago');
        expect(result).toEqual([]);
    });

    it('should perform a case-insensitive search', async () => {
        const locationService = new LocationService();
        const result = await locationService.searchLocations('new york');
        expect(result).toEqual([mockLocations[0]]);
    });

    it('should throw a 400 error if the query is missing', async () => {
        const locationService = new LocationService();
        await expect(locationService.searchLocations('')).rejects.toEqual({
            status: 400,
            message: 'Query parameter is missing or invalid.',
        });
    });

});

================
File: app/specs/openai.yaml
================
openapi: 3.0.0
info:
  title: Weather App API
  description: This API allows users to search for locations across the US by city or airport name for weather forecast information lookup.
  version: "1.0.1"
servers:
  - url: http://localhost:3000/api/v1
paths:
  /locations/search:
    get:
      summary: Search for locations by name
      description: Searches for locations by city or airport name and returns detailed information about each matching location.
      operationId: searchLocations
      parameters:
        - in: query
          name: query
          required: true
          schema:
            type: string
          description: The city or airport name to search for.
      responses:
        '200':
          description: A list of locations matching the search query.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LocationsResponse'
        '400':
          description: Missing or invalid query parameter.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: No locations found matching the search query.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '500':
          description: An unexpected error occurred.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
components:
  schemas:
    Location:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        type:
          type: string
          enum:
            - City
            - Airport
        state:
          type: string
        country:
          type: string
          default: "USA"
        latitude:
          type: number
          format: double
        longitude:
          type: number
          format: double
        airportCode:
          type: string
          nullable: true
    LocationsResponse:
      type: object
      properties:
        locations:
          type: array
          items:
            $ref: '#/components/schemas/Location'
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
-------

## **Implementation Guidance Needed**

### **New Files Required**

* Controllers/handlers for new endpoints
* Service layer implementations
* Data models/interfaces
* Test files
* Configuration updates
* Documentation updates

### **Updates to Existing Files**

* Route registrations
* Dependency injections
* Configuration changes
* Interface extensions
* Common utility modifications

### **Implementation Requirements**

* Follow existing architectural patterns
* Maintain consistent error handling
* Include proper input validation
* Add comprehensive testing
* Update API documentation
* Consider performance requirements
* Follow existing coding standards
* **Ensure type safety**:
  * Use TypeScript's type system to enforce type safety throughout the codebase.
  * Avoid using `any` and prefer `unknown` for error handling.
  * Perform type checks and assertions where necessary.

## **Solution Guidelines**

### **Core Requirements**

* Integrate seamlessly with existing patterns
* Maintain consistent error handling
* Include proper validation
* Have comprehensive test coverage
* Follow existing documentation standards
* Follow the established code style
* **Type Safety Best Practices**:
  * Define and use interfaces and types for all data structures.
  * Use `unknown` for error handling and perform type checks before accessing properties.
  * Avoid using `any` as it bypasses TypeScript's type checking.
  * Utilize TypeScript's utility types (e.g., `Partial`, `Pick`, `Omit`) to create flexible and reusable types.
  * Ensure all function parameters and return types are explicitly typed.
  * Use strict null checks and handle `null` and `undefined` values appropriately.
  * Leverage TypeScript's `strict` mode for enhanced type safety.