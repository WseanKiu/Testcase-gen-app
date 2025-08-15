import getDescriptionAndNotes from "./getResponse.js";
import { Prompt_Statements } from "./prompt_constants.js";

// Building the prompt
async function createPrompt(userInput) {
  try {
    const { description, notes } = await getDescriptionAndNotes(userInput);
    const { Context, Task, Constraint, Example } = Prompt_Statements;

    const prompt = `${Context}\n\n${Task}\n\n${description}\n\n${Constraint}\n\n${Example}${notes}`;

    return prompt;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export default createPrompt;
