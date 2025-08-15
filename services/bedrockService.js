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

export async function handleClaudeRequest(UserStoryNumber, status) {
  try {
    status.update("📖 Reading user story data...");
    const userInput = await createPrompt(UserStoryNumber);

    status.update("🤖 Generating AI prompt and sending request...");
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 4000,
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
    
    status.update("🔄 Processing AI response...");
    const responseBody = await response.body.transformToString();
    const json = JSON.parse(responseBody);
    const content = typeof json.content === "string" ? JSON.parse(json.content) : json.content;
    
    status.update("⚙️ Transforming response into test case format...");
    const aoa_format_content = transformResponse(content);

    // Validate the content before processing
    if (!Array.isArray(aoa_format_content) || aoa_format_content.length === 0) {
      throw new Error("Failed to extract valid test case data from AI response");
    }

    status.update(`📊 Creating Excel workbook with ${aoa_format_content.length - 1} test cases...`);
    
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

    status.update("✨ Formatting Excel file...");
    
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

    status.update("💾 Saving Excel file to Desktop...");
    
    // Save Excel file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const desktopDir = `${os.homedir()}/Desktop`;
    const folderName = "Generated TestCases";
    const folderPath = `${desktopDir}/${folderName}`;

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    const fileName = `${UserStoryNumber}_test-cases-${timestamp}.xlsx`;
    const filePath = `${folderPath}/${fileName}`;
    await workbook.xlsx.writeFile(filePath);

    // Return summary information instead of full content
    return {
      testCasesGenerated: aoa_format_content.length - 1,
      fileName: fileName,
      filePath: filePath,
      userStory: UserStoryNumber
    };
    
  } catch (error) {
    throw new Error(error.message || "Unknown error occurred during processing");
  }
}
