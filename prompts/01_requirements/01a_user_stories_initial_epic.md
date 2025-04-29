Implement a feature allowing the user to add locations other than the current location to look up the weather in those locations quickly. These locations are saved preferences and will differ per user and from the primary list of locations. A user must be able to:

1. Search for a location by city or airport name using the Locations Search API endpoint, and then add the location to their list of saved locations, at which time the system should save the location’s id.
2. List all their saved locations and include all relevant details of that location.
3. Delete a saved location from their saved locations list.

## **Additional context**

The user will authenticate before using the API so the system will know who they are. The /locations/search API already exists; you do not need to write a user story for this API.

## **API Spec**

Below are specs for existing API resources that can be used to implement the functionality.

```
openapi: 3.0.0
info:
  title: Weather App API
  description: This API allows users to search for locations across the US by city or airport name for weather forecast information lookup.
  version: "1.0.1"
servers:
  - url: http://localhost/v1
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
        '401':
          description: Unauthorized access. Invalid API key provided.
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
  /user:
    get:
      summary: Get current user details
      description: Returns details about the current authenticated user.
      operationId: getCurrentUserDetails
      responses:
        '200':
          description: Details of the current user.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserDetails'
        '401':
          description: Unauthorized access. Invalid or missing authentication token.
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

```