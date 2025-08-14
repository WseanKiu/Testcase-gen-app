import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";
import ExcelJS from "exceljs";
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
  console.log("aoa_format_content >>> ", aoa_format_content);

  // Create Excel using exceljs
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("TestCases");

  // Add rows
  aoa_format_content.forEach((row, rowIndex) => {
    const addedRow = worksheet.addRow(row);

    // Format header row
    if (rowIndex === 0) {
      addedRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD700" }, // Dark yellow
        };
        cell.font = { bold: true };
        cell.alignment = {
          wrapText: true,
          vertical: "middle",
          horizontal: "center",
        };
      });
    }
  });

  // Autofit column widths to content
  worksheet.columns.forEach((column) => {
    let maxLength = 10;

    column.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
      if (!cell.value) return;

      let cellText = cell.value.toString();

      // Split multiline content and check each line's length
      const lines = cellText.split("\n");
      lines.forEach((line) => {
        if (line.length > maxLength) {
          maxLength = line.length;
        }
      });

      // Enable text wrapping
      cell.alignment = { wrapText: true, vertical: "top" };
    });

    // Set final column width based on longest line
    column.width = maxLength + 2;
  });

  // Save Excel file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const desktopDir = `${os.homedir()}/Desktop`;
  const folderName = "Generated TestCases";
  const folderPath = `${desktopDir}/${folderName}`;

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
    console.log(`📁 Folder created: ${folderPath}`);
  } else {
    console.log(`📁 Folder already exists: ${folderPath}`);
  }

  const filePath = `${folderPath}/${UserStoryNumber}_test-cases-${timestamp}.xlsx`;
  await workbook.xlsx.writeFile(filePath);

  console.log(`✅ Excel file saved to: ${filePath}`);
  return content;
}
