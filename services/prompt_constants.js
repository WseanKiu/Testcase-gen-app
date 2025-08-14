// Prompt standardize stament
// Note: Avoid changing/updating this prompt constanst as this one is build to traget a specific ai repsonse to avoid vagueness/hallucinations
export const Prompt_Statements = {
  Context: "You are a QA engineer testing a user story.",
  Task: "Create a set of test cases base on the following user story description: ",
  Constraint:
    "Test cases must cover the following acceptance citeria describe in the user story.",
  Example:
    "Exaple Test Case with the format: Test Case Id: `sample id`, Test Case Name:`sample test name, Pre-conditions: `sample pre condition must come from the NOTES declare below, should be on lsit numeric order`, Test Steps: `sample steps should be in list numeric order, Expected Results: `sample expected results should be based on the Acceptance Criteria, Actuak Results: `leave this bank`, Status: `leave this blank`. Output also should be in the aoa_to_sheet format",
};
