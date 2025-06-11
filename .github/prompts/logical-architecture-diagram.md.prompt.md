---
mode: 'ask'
---
Create me a Mermaid JS diagram that visualizes the application architecture using the following specifications:

0.5 THEME
Always start with:
%%{init: {'theme': 'neutral'}}%%

1. GRAPH SETUP
- Use graph TD for top-down directed graph
- Group related components using subgraphs with quoted names when containing spaces
- Set direction TB (top to bottom) within subgraphs

2. COMPONENT IDENTIFICATION
Only include components that are actually present in the codebase:
- Backend services/routes
- API interfaces/clients  
- Data stores
- External interfaces (user/browser)
- Documentation/contract files
- Error handlers/middleware

3. VISUAL STYLING
Use these style classifications for existing components only:
- API clients: Pale green fill (#c1faa0), dark green border (#236d4a), 2px dashed border
- Backend entry points: Light blue fill (#bcdfff), dark blue border (#18487a), 2px border
- Backend routes: Pale blue fill (#d6e8fa), medium blue border (#2e5eaa)
- Error handlers: Light red fill (#ffd6d6), dark red border (#d32f2f), 2px border
- Data stores: Grey fill (#eee), grey border (#9e9e9e), 2px border
- API docs: Beige fill (#ffe1b3), orange border (#fb8c00), 5-3 dashed border
- External users: Cream fill (#fffbe3), brown border (#9b7b28), 2px border

4. RELATIONSHIPS
Show connections using correct Mermaid.js syntax:
- Solid arrows: A -- "label" --> B
- Dashed arrows: A -. "label" .-> B
- Labeled arrows: A --|label|--> B
- Group related error flows

5. LAYOUT GUIDELINES
- Place external actors (users) at top
- Place data stores at bottom
- Show API documentation to the side
- Keep error handlers visually separate
- Only create subgraphs for components that exist in the codebase

6. ANNOTATIONS
- Use quotes for subgraph names containing spaces: subgraph "Name With Spaces"
- Use descriptive labels for connections
- Add line breaks (<br/>) in labels for readability
- Ensure consistent spacing between sections
- Remove any extra blank lines within subgraphs

7. SYNTAX REQUIREMENTS
- Use proper arrow syntax with spaces: A -- "label" --> B
- Use correct dotted line syntax: A -. "label" .-> B
- Use proper pipe syntax for labeled arrows: A --|label|--> B
- Always quote subgraph names containing spaces
- Use single brackets for node definitions: nodeId["Node Label"]
- Maintain consistent spacing between sections

Generate a Mermaid.js diagram following these specifications, including only components that exist in the provided codebase. Do not create placeholders or representations for components that are not present in the code.