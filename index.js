#!/usr/bin/env node

import dotenv from "dotenv";
import { handleClaudeRequest } from "./services/bedrockService.js";
import { StatusTracker } from "./services/statusTracker.js";

dotenv.config();
const userInput = process.argv.slice(2).join(" ");

if (!userInput) {
  console.error("❌ Please provide a user story as input.");
  console.log("Usage: yarn exeqt <user-story-number>");
  console.log("Example: yarn exeqt us1235");
  process.exit(1);
}

(async () => {
  const status = new StatusTracker();
  
  try {
    // ExeQT ASCII Logo
    console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║    ███████╗██╗  ██╗███████╗ ██████╗ ████████╗
║    ██╔════╝╚██╗██╔╝██╔════╝██╔═══██╗╚══██╔══╝
║    █████╗   ╚███╔╝ █████╗  ██║   ██║   ██║   
║    ██╔══╝   ██╔██╗ ██╔══╝  ██║▄▄ ██║   ██║   
║    ███████╗██╔╝ ██╗███████╗╚██████╔╝   ██║   
║    ╚══════╝╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝    ╚═╝   
║                                       ║
║         🤖 Test Case Generator        ║
║             Powered by GenAI          ║
╚═══════════════════════════════════════╝
`);
    
    console.log(`📝 Processing: ${userInput.toUpperCase()}\n`);
    
    status.start("Executing test case generation... Please wait...");
    
    const result = await handleClaudeRequest(userInput, status);
    
    status.complete([
      `✨ Generated ${result.testCasesGenerated} test cases successfully!`,
      `📄 File: ${result.fileName}`,
      `📂 Saved to: Desktop/Generated TestCases/`
    ], true);
    
    console.log(`\n🎉 Done! Check your Desktop/Generated TestCases folder for the Excel file.`);
    
  } catch (error) {
    status.fail(`Generation failed: ${error.message}`);
    process.exit(1);
  }
})();
