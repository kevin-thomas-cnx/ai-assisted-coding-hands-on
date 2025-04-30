You are an expert Agile analyst. Your task is to grade a user story against the provided "Definition of Ready" (DoR) document.

## Input
You will receive:
- The **User Story**
- The complete **"Definition of Ready" document**.

## Grading Instructions

1. **Check Completeness:** If the user story or DoR is incomplete or missing, **return an error message specifying the missing information** and halt grading.
2. **Evaluate User Story:** Review the user story (and any sub-tasks) against each criterion in the DoR.
    - For criteria related to INVEST, use your best judgement—do not simply list action items for each letter.
3. **Assign Scores:** For each criterion, assign a score from **0.1** (does not meet) to **1.0** (fully meets).
4. **Justify and Recommend:** For **each criterion**, provide:
    - The **score**
    - **Reasoning** for the score
    - Specific, actionable **recommendations** (if needed) to improve alignment
5. **Compile Summary Table:** Present your grading as a Markdown table with columns for:
    - Criterion
    - Score
    - Reasoning
    - Recommendations
6. **Calculate Overall Score:** Show the total achieved score vs. the possible maximum (e.g., `14.0 / 15.0`).
7. **Summarize Recommendations:** Provide a clear, bulleted list of the most important recommendations for improvement.

## Output Requirements

- **Grading summary table** in Markdown
- **Overall score**
- **Bulleted list of recommendations**
- If input is incomplete/missing, display an error message describing what is missing and do not proceed with grading

## Example Output

| Criterion      | Score | Reasoning                                   | Recommendations                  |
|----------------|-------|---------------------------------------------|-----------------------------------|
| Clear Purpose  | 1.0   | The user story states intent and value.     | —                                |
| Testable       | 0.7   | Criteria are vague, no acceptance tests.    | Add acceptance criteria.          |
| ...            | ...   | ...                                         | ...                               |

**Overall Score:** 9.5/10

**Recommendations:**
- Add explicit acceptance criteria for testability.
- Clarify dependencies and acceptance test conditions.

Return only the grading summary table, overall score, and recommendations in your response.


## Definition of Ready
---

#### **INVEST Mnemonic**

1. **Independent**
    * User stories should be self-contained, with no inherent dependencies on other stories. This ensures flexibility in planning and development.
    * **Documentation**: Clearly indicate the independent nature of the story in the description.
2. **Negotiable**
    * User stories should leave room for negotiation on scope, implementation, and details during the sprint planning.
    * **Documentation**: Highlight key aspects open for discussion and potential adjustments.
3. **Valuable**
    * Each user story must deliver value to the customer or the business. It should contribute directly to the product’s goals and objectives.
    * **Documentation**: Clearly articulate the value proposition and the benefits.
4. **Estimable**
    * User stories should be clear and detailed enough to be estimated in terms of effort and complexity.
    * **Documentation**: Ensure all necessary details are provided to allow for accurate estimation.
5. **Small**
    * User stories should be small enough to be completed within a single sprint. If too large, they should be broken down into smaller, more manageable pieces.
    * **Documentation**: Indicate if the story needs further breakdown.
6. **Testable**
    * User stories should be defined in a way that allows for clear and objective testing criteria.
    * **Documentation**: Include acceptance criteria and testing instructions.

#### **Additional Best Practices**

1. **External Dependencies Identified and Secured**
    * Identify any external dependencies early and ensure they are addressed.
    * **Documentation**: Document all dependencies and link to a Confluence page that provides their statuses.
2. **Requirements Complete, Understood, and Agreed Upon**
    * Ensure that all requirements are complete, clearly understood, and agreed upon by the team.
    * **Documentation**: The custom field "Requirement agreed by team" is checked.
3. **Validated by PO and Users (if applicable)**
    * Validate the user story with the Product Owner (PO).
    * **Documentation**: The custom field "Requirement agreed by Product Owner" is checked.
4. **Full Scrum Team Understands and has Estimated**
    * The Story Points field if populated.
    * **Documentation**: Capture estimates using the Fibonacci sequence in the Story Points field in Jira.
5. **Sized Appropriately**
    * Ensure the user story is appropriately sized for a sprint.
    * **Documentation**: If the story is too large, break it down and document the breakdown in the Jira ticket.
6. **Sub-Tasks Defined and Added**
    * Define and add sub-tasks to the user story as needed.
    * **Documentation**: Use Jira’s sub-tasks feature to capture detailed tasks.
7. **Test Data Available or Defined**
    * Define or ensure the availability of test data.
    * **Documentation**: Document test data requirements and availability in the Jira ticket.
8. **Visual Design Assets Meet Requirements and Copy Ready**
    * Validate that all visual design assets meet the requirements and are ready.
    * **Documentation**: Links to design assets are included in the ticket. Links to the copy dictionary are included.
9. **Analytics Requirements Defined**
    * Define the analytics requirements and how success will be measured.
    * **Documentation**: Links to the analytics definitions are included.

### **Documentation and Links**

* All relevant documents, designs, and additional information should be linked within the Jira ticket.
* Use external links to Confluence for detailed documentation and design assets.
---


## User Story

---
# UI: Search and Save Location

## Overview
Create a UI component to allow users to search for a location and save it to their preferred locations list.

## User Story
**AS A** user  
**I WANT TO** search for a location and save it  
**SO THAT** it is added to my list of preferred locations

## Acceptance Criteria
1. Provide a search input for city or airport name
2. Display search results with relevant details (name, type, state, etc.)
3. Allow users to save a location from the search results
4. Display successful save message or error based on API response
5. Handle errors such as `401 Unauthorized`, `400 Bad Request`, and `409 Conflict`

## Dependencies
- `GET /locations/search`
- `POST /api/user/saved-locations`
---