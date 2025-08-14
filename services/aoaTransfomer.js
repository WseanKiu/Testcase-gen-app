export const transformResponse = (response_raw) => {
  const fullText = response_raw[0].text;
  console.log(`fulltext >>>`, fullText);
  const cleanText = fullText.replace(/```python|```/g, "").trim();

  // Extract the array part of the response for the excel consumption
  const match = cleanText.match(/aoa_to_sheet\s*=\s*(\[[\s\S]*\])/);

  if (!match) {
    console.error("Could not extract AOA array.");
    process.exit(1);
  }

  let aoaString = match[1];
  const aoa = JSON.parse(aoaString);
  return aoa;
};
