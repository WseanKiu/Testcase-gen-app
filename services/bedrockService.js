import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
import * as XLSX from "xlsx";
import { mkdirSync, existsSync } from "fs";
import os from "os";
import createPrompt from "./createPrompt.js";
import { transformResponse } from "./aoaTransfomer.js";

dotenv.config();

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function handleClaudeRequest(UserStoryNumber) {
  const userInput = await createPrompt(UserStoryNumber);

  const command = new InvokeModelCommand({
    modelId: process.env.BEDROCK_MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: JSON.stringify(userInput),
        },
      ],
    }),
  });

  const response = await client.send(command);
  const responseBody = await response.body.transformToString();

  const json = JSON.parse(responseBody);
  const content =
    typeof json.content === "string" ? JSON.parse(json.content) : json.content;
  const aoa_format_content = transformResponse(content);

  const worksheet = XLSX.utils.aoa_to_sheet(aoa_format_content);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "TestCases");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  // Get Desktop path dynamically - any user
  const desktopDir = `${os.homedir()}/Desktop`;
  const folderName = "Generated TestCases"; // Your new folder
  const folderPath = `${desktopDir}/${folderName}`;

  // Check if folder exists
  // if true - dont create
  //if false  - create folder
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
    console.log(`Folder created: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }

  // Define the file path inside the new folder - filePath, filename
  const filePath = `${folderPath}/${UserStoryNumber}_test-cases-${timestamp}.xlsx`;

  // Write the file
  XLSX.writeFile(workbook, filePath);

  console.log(`✅ Excel file saved to: ${filePath}`);
  return content;
}
