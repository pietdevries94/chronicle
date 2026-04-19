export type SentimentTone = "positive" | "neutral" | "negative";

export function getSentimentTone(sentiment: number): SentimentTone {
  if (sentiment >= 0.55) return "positive";
  if (sentiment >= 0.35) return "neutral";
  return "negative";
}

export function getSentimentPercent(sentiment: number): number {
  return Math.round(sentiment * 100);
}
