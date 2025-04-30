I have the following requirement Epic:

---
### *REPLACE WITH YOUR EPIC TEXT* ###
---

Create INVEST-based user stories for both API and UI components following this structure:

### Ticket Format
- Prefix: "API: " or "UI: "
- Title: Short, descriptive summary
- Description sections:
    1. Overview
    2. User Story (AS A/I WANT TO/SO THAT)
    3. Acceptance Criteria
    4. Dependencies (UI tickets only)

### Requirements
1. API Stories:
    - Include URI parameters
    - Specify request/response bodies
    - Define HTTP status codes
    - Follow RESTful practices

2. UI Stories:
    - Separate story for each feature
    - Handle all API response scenarios
    - List API dependencies with METHOD/endpoint
    - Include error states

### Formatting
- Use Markdown
- Each section title on new line
- List items on separate lines
- Maintain specified carriage returns

Example Output:
```
# API: Create Task Endpoint

## Overview
Implement an API endpoint to allow users to create a new task within their project management application using a RESTful interface.

## User Story
**AS A** registered user  
**I WANT TO** create a task by providing all required details  
**SO THAT** I can track my pending work items in the system

## Acceptance Criteria
1. The endpoint is available at `POST /api/tasks`
2. The request body must contain:
   - `title` (string, required)
   - `description` (string, optional)
   - `due_date` (ISO8601 date, optional)
3. If request is valid, returns HTTP `201 Created` and created task object
4. If required fields missing/invalid, returns HTTP `400 Bad Request` with error messages
5. If user not authenticated, returns HTTP `401 Unauthorized`

## Dependencies
*None*
```

Note: Focus on completeness, error handling, and clear acceptance criteria.
