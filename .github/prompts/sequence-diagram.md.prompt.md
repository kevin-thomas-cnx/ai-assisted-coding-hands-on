---
mode: 'ask'
---
Use the following mermaid.js format when creating the sequence diagram definition:

%%{init: {'theme': 'neutral'}}%%
sequenceDiagram
%% Defining the actors
actor User
participant SystemA as System A
participant SystemB as System B
%% Description of the action
User->>SystemA: Request to perform action
note right of SystemA: User initiates a request to perform said action
SystemA->>SystemB: HTTP METHOD /URI-of-endpoint
note right of SystemB: System Beta performs <business logic description> to perform said action
SystemB->>SystemA: Returns data for said action
SystemA->>User: Display list of pets
note left of User: User views output from <description of output from system A>

In the notes to the left and right of actors in the sequence diagram, use a "<br>" linebreak character to ensure the notes are within 20-30 characters long per line.

Return all of the actions in one single block of code.