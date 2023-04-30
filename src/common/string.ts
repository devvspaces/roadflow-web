

export const capitalize = (text: string) => {
  return text.split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function truncateString(str: string, maxChars: number): string {
  if (str.length <= maxChars) {
    return str;
  }
  return str.slice(0, maxChars) + "...";
}
