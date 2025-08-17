# 🚀 ExeQT - AI-Powered Test Case Generator

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-org/exeqt)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

A powerful Node.js CLI tool that leverages **AWS Bedrock Claude 3 Sonnet** to automatically generate comprehensive test cases from user stories and exports them to Excel format.

## ✨ Features

- 🤖 **AI-Powered Generation**: Uses Amazon Bedrock Claude 3 Sonnet for intelligent test case creation
- 📊 **Excel Output**: Automatically formats and saves test cases as professional `.xlsx` files
- 🎯 **Comprehensive Coverage**: Generates positive, negative, edge cases, and UI validations
- 💻 **CLI Interface**: Simple command-line interface for easy integration
- 🔄 **Status Tracking**: Real-time progress updates with animated status indicators
- 📁 **Organized Output**: Saves files to `Desktop/Generated TestCases/` with timestamps
- 🎨 **Professional Logo**: Beautiful ASCII art branding

## 🏗️ Architecture

```
exeqt/
├── index.js                 # Main CLI entry point
├── services/
│   ├── bedrockService.js     # AWS Bedrock integration
│   ├── createPrompt.js       # AI prompt generation
│   ├── getResponse.js        # User story data handling
│   ├── aoaTransfomer.js      # Response parsing & transformation
│   ├── statusTracker.js      # Progress tracking utilities
│   └── prompt_constants.js   # AI prompt templates
├── stubs/
│   ├── us1235_response.json  # Sample login user story
│   ├── us1239_response.json  # Sample search user story
│   └── README.md            # Stubs documentation
└── .env                     # AWS credentials (gitignored)
```

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **Yarn** >= 1.22.0
- **AWS Account** with Bedrock access
- **AWS Bedrock** Claude 3 Sonnet model enabled

### 1. Clone & Install

```bash
git clone https://github.com/your-org/exeqt.git
cd exeqt
yarn install
```

### 2. Configure AWS Credentials

Create a `.env` file in the root directory:

```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
```

### 3. Verify Setup

```bash
yarn validate
```

## 🚀 Usage

### Basic Command

```bash
yarn exeqt <user-story-id>
```

### Examples

```bash
# Generate test cases for user story US1235
yarn exeqt us1235

# Generate test cases for user story US1239
yarn exeqt us1239
```

### Sample Output

```
╔═══════════════════════════════════════╗
║    ███████╗██╗  ██╗███████╗ ██████╗ ████████╗
║    ██╔════╝╚██╗██╔╝██╔════╝██╔═══██╗╚══██╔══╝
║    █████╗   ╚███╔╝ █████╗  ██║   ██║   ██║   
║    ██╔══╝   ██╔██╗ ██╔══╝  ██║▄▄ ██║   ██║   
║    ███████╗██╔╝ ██╗███████╗╚██████╔╝   ██║   
║    ╚══════╝╚═╝  ╚═╝╚══════╝ ╚══▀▀═╝    ╚═╝   
║         🤖 Test Case Generator        ║
║             Powered by GenAI          ║
╚═══════════════════════════════════════╝

📝 Processing: US1235

⠋ 📖 Reading user story data...
⠋ 🤖 Generating AI prompt and sending request...
⠋ 🔄 Processing AI response...
⠋ ⚙️ Transforming response into test case format...
⠋ 📊 Creating Excel workbook with 14 test cases...
⠋ ✨ Formatting Excel file...
⠋ 💾 Saving Excel file to Desktop...

✅ ✨ Generated 14 test cases successfully!
📄 File: us1235_test-cases-2025-08-17T01-04-27-282Z.xlsx
📂 Saved to: Desktop/Generated TestCases/

🎉 Done! Check your Desktop/Generated TestCases folder for the Excel file.
```

## 📁 Output Format

Generated Excel files include:

| Column | Description |
|--------|-------------|
| Test Case Id | Unique identifier (TC001, TC002, etc.) |
| Test Case Name | Descriptive name of the test |
| Pre-conditions | Setup requirements |
| Test Steps | Step-by-step instructions |
| Expected Results | Expected outcomes |
| Actual Results | (Empty for execution) |
| Status | (Empty for execution) |

## 🧪 Testing with Stubs

The project includes sample user stories for testing:

- `us1235` - Login functionality test case
- `us1239` - Search functionality test case

These use local stub data located in the `stubs/` directory.

## 🔧 Available Scripts

```bash
yarn exeqt <story-id>   # Generate test cases
yarn start <story-id>   # Alternative to exeqt
yarn validate          # Validate code syntax
yarn clean             # Clean generated files
yarn test              # Run tests (to be implemented)
```

## 🛠️ Development

### Adding New User Stories

1. Add a new JSON file to `stubs/` following the naming pattern: `{story_id}_response.json`
2. Follow the existing JSON structure
3. Test with: `yarn exeqt {story_id}`

### Future Rally Integration

The stub system will be replaced with Rally API integration. The current architecture supports this transition through the `getResponse.js` service.

## 📋 Requirements

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- AWS Bedrock access
- Claude 3 Sonnet model permissions

## 🔒 Security

- Never commit `.env` files
- Use IAM roles with minimal required permissions
- Rotate AWS keys regularly
- Keep dependencies updated

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ by the ExeQT Team**

```bash
git clone https://github.com/your-org/enterprise-bedrock-cli.git
cd exeqt
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
