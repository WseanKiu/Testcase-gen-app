# 🧠 GenAI Test Case CLI Tool (AWS Bedrock Claude 3 Sonnet)

A Node.js CLI tool that connects to **Amazon Bedrock Claude 3 Sonnet** using the **AWS SDK** to generate test cases from user stories and save them as Excel files.

---

## ✅ Features

- 📤 **Excel Output**: Saves structured test cases as `.xlsx` files  
- 💻 **CLI Based**: Run via  
  ```bash
  yarn exeqt <story_id>
  ```
- 🤖 **Powered by Claude 3 Sonnet**: Uses Amazon Bedrock SDK  

---

## ⚙️ Setup Instructions

### 1. 📦 Clone and Install Dependencies

```bash
git clone https://github.com/your-org/enterprise-bedrock-cli.git
cd Testcase-gen-app
yarn install
```

---

### 2. 🔐 Configure Environment Variables

Create a `.env` file in the root directory:

```env
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
```

---

### 3. 🚀 Run the CLI Tool

```bash
node index.js "As a user, I want to log into the banking app with 2FA."
```

### ✅ Output

- 🧪 Test cases printed directly in the terminal  
- 📁 Excel file saved to:

```
test-cases/generated/test-cases-<timestamp>.xlsx
```
