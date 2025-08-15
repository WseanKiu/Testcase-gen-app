// Prompt standardize stament
// Note: Avoid changing/updating this prompt constanst as this one is build to traget a specific ai repsonse to avoid vagueness/hallucinations
export const Prompt_Statements = {
  Context: "You are a QA engineer testing a user story.",
  Task: `Given the following User Story (US) description, generate a comprehensive set of test cases. The test cases should cover:
Positive and negative scenarios
Complex edge cases and exception handling
All applicable UI validations (e.g., required fields, input formats, masking, character limits)
Formatting rules (e.g., date, currency, phone number) if applicable
Cross-platform considerations for both web and mobile applications
Accessibility and responsiveness checks.`,
  Constraint:
    "Test cases must cover the following acceptance citeria describe in the user story.",
  Example:
    'Example Test Case format: Test Case Id: \'TC001\', Test Case Name: \'Verify login functionality\', Pre-conditions: \'1. User has valid credentials, 2. Application is accessible\', Test Steps: \'1. Navigate to login page, 2. Enter valid credentials, 3. Click login button\', Expected Results: \'User successfully logs in and is redirected to dashboard\', Actual Results: \'leave blank\', Status: \'leave blank\'. IMPORTANT: Your response must contain a JavaScript code block with the exact format: ```javascript const aoa_to_sheet = [[\\"Test Case Id\\", \\"Test Case Name\\", \\"Pre-conditions\\", \\"Test Steps\\", \\"Expected Results\\", \\"Actual Results\\", \\"Status\\"], [\\"TC001\\", \\"Sample test\\", \\"1. Precondition\\", \\"1. Test step\\", \\"Expected result\\", \\"\\", \\"\\"]]; ``` This format is required for Excel generation.',
};
