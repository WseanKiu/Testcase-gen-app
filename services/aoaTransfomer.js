export function transformResponse(content) {
  const rawText = content[0]?.text || "";

  // Try multiple patterns to extract the array
  const patterns = [
    /```javascript\s+const\s+aoa_to_sheet\s*=\s*(\[[\s\S]*?\]);?\s*```/,
    /```javascript\s+(\[[\s\S]*?\])\s*```/,
    /const\s+aoa_to_sheet\s*=\s*(\[[\s\S]*?\]);?/,
    /aoa_to_sheet\s*=\s*(\[[\s\S]*?\]);?/,
    /(\[\s*\[\s*["']Test Case Id["'][\s\S]*?\][\s\S]*?\])/
  ];

  let arrayText = null;
  let codeMatch = null;

  for (const pattern of patterns) {
    codeMatch = rawText.match(pattern);
    if (codeMatch) {
      arrayText = codeMatch[1];
      break;
    }
  }

  if (!arrayText) {
    console.error("❌ No JavaScript code block with `aoa_to_sheet` array found.");
    console.log("Raw response text:", rawText.substring(0, 500) + "...");
    return [];
  }

  try {
    // Clean up the array text
    arrayText = arrayText.trim();
    if (arrayText.endsWith(';')) {
      arrayText = arrayText.slice(0, -1);
    }

    // Check if the array is incomplete (missing closing bracket)
    if (!arrayText.endsWith(']')) {
      console.warn("⚠️ Array appears incomplete, attempting to fix...");
      // Count opening and closing brackets
      const openBrackets = (arrayText.match(/\[/g) || []).length;
      const closeBrackets = (arrayText.match(/\]/g) || []).length;
      
      // Add missing closing brackets
      const missingBrackets = openBrackets - closeBrackets;
      if (missingBrackets > 0) {
        arrayText += ']'.repeat(missingBrackets);
      }
    }

    // Use `eval` inside a VM-safe context (or JSON.parse if the content is safe)
    const aoa = eval(arrayText); // ❗ Safe here because we control Claude's prompt
    
    if (!Array.isArray(aoa) || aoa.length === 0) {
      console.error("❌ Parsed result is not a valid array or is empty");
      return [];
    }
    
    // Ensure we have at least the header row
    if (aoa.length < 2) {
      console.warn("⚠️ Only header row found, adding sample test case");
      aoa.push(["TC001", "Sample test case", "1. Sample precondition", "1. Sample test step", "Sample expected result", "", ""]);
    }
    
    return aoa;
  } catch (err) {
    console.error("❌ Failed to parse array from code block:", err);
    console.log("Array text that failed:", arrayText);
    return [];
  }
}
