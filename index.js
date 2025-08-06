import dotenv from 'dotenv';
import { handleClaudeRequest } from './services/bedrockService.js';

dotenv.config();

const userInput = process.argv.slice(2).join(' ');

if (!userInput) {
  logger.error('❌ Please provide a user story as input.');
  process.exit(1);
}

(async () => {
  try {
    const result = await handleClaudeRequest(userInput);
    console.log('\n🧪 Generated Test Cases:\n', result);
  } catch (error) {
    logger.error('Claude request failed', error);
    process.exit(1);
  }
})();
