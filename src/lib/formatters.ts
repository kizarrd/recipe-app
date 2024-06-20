export function formatInShortMonthDayCommaYear(epochTime: Date) {
  const date = new Date(epochTime);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return formatter.format(date); // Example output: "Jun 18, 2024"
}

export const truncateFromThirdDecimals = (number: number) => {
  return Math.floor(number * 100) / 100;
}