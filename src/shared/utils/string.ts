export function slugify(text: string) {
  // Convert to lowercase and trim whitespace
  const trimmed = text.toLowerCase().trim();

  // Replace non-alphanumeric characters with "-"
  const filtered = trimmed.replace(/[^a-z0-9]+/g, "-");

  // Remove duplicate "-" characters
  const normalized = filtered.replace(/--+/g, "-");

  // Remove leading and trailing "-" characters
  return normalized.replace(/(^-+|-+$)/g, "");
}
const extensionsMap = {
  "-png": ".png",
  "-jpg": ".jpg",
  "-gif": ".gif",
  "-svg": ".svg",
  "-pdf": ".pdf",
  "-docx": ".docx",
  "-doc": ".doc",
};

export function replaceTextToExtension(fileName: string) {
  // Loop through each extension mapping
  for (const text of Object.keys(extensionsMap)) {
    const regex = new RegExp(text, "gi"); // Case-insensitive global replace
    fileName = fileName.replace(
      regex,
      extensionsMap[text as keyof typeof extensionsMap]
    );
  }
  return fileName;
}
