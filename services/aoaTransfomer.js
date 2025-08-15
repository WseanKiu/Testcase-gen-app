export function transformResponse(content) {
  const rawText = content[0]?.text || "";

  // Extract the JS code block
  const codeMatch = rawText.match(
    /```javascript\s+const\s+aoa_to_sheet\s*=\s*(\[[\s\S]*?\]);?\s*```/
  );

  if (!codeMatch) {
    console.error(
      "❌ No JavaScript code block with `aoa_to_sheet` array found."
    );
    return [];
  }

  const arrayText = codeMatch[1];

  try {
    // Use `eval` inside a VM-safe context (or JSON.parse if the content is safe)
    const aoa = eval(arrayText); // ❗ Safe here because we control Claude's prompt
    return aoa;
  } catch (err) {
    console.error("❌ Failed to parse array from code block:", err);
    return [];
  }
}
