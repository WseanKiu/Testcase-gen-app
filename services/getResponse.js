import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Path to the JSON file - Temporary
// To Do: This should be connected to the the Rally response data come integration
// To Do: to get/fetch the response from Rally
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Async function to get description and notes
async function getDescriptionAndNotes(userInput) {
  const filePath = path.join(__dirname, `${userInput}_response.json`);
  try {
    const data = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(data);

    const userStory = json.UserStory || {};
    const description = userStory.Description || "";
    const notes = userStory.Notes || "";

    return { description, notes };
  } catch (error) {
    throw new Error(`Failed to read or parse the file: ${error.message}`);
  }
}

export default getDescriptionAndNotes;
