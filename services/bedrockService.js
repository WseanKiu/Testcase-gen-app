import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import dotenv from 'dotenv';
import * as XLSX from 'xlsx';
import { mkdirSync, existsSync } from 'fs';
  
dotenv.config();
  
const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function handleClaudeRequest(userStory) {
    const prompt = `
        Generate 3 structured test cases for this user story:
        
        "${userStory}"
        
        Format as JSON like:
        [
            {
            "title": "string",
            "steps": "string with \\n between steps",
            "expectedResult": "string"
            }
        ]
        Only return valid JSON.
    `;
  
    const command = new InvokeModelCommand({ 
        modelId: process.env.BEDROCK_MODEL_ID,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
            anthropic_version: 'bedrock-2023-05-31',
            max_tokens: 1024,
            temperature: 0.3,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    });

    const response = await client.send(command);
    const responseBody = await response.body.transformToString();

    const json = JSON.parse(responseBody);
    const content = typeof json.content === 'string' ? JSON.parse(json.content) : json.content;

    const worksheet = XLSX.utils.json_to_sheet(content);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'TestCases');
  
    const dir = './test-cases/generated';
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = `${dir}/test-cases-${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filePath);
  
    console.log(`✅ Excel file saved to: ${filePath}`);
    return content;
}
  