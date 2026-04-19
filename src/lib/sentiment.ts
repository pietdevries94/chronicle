export type SentimentVariant = "default" | "warm" | "amber" | "gold" | "dark";
export type SentimentTone = "positive" | "neutral" | "negative";

export function getSentimentVariant(sentiment: number): SentimentVariant {
  if (sentiment >= 0.65) return "default";
  if (sentiment >= 0.45) return "warm";
  if (sentiment >= 0.3) return "amber";
  if (sentiment >= 0.15) return "gold";
  return "dark";
}

export function getSentimentTone(sentiment: number): SentimentTone {
  if (sentiment >= 0.55) return "positive";
  if (sentiment >= 0.35) return "neutral";
  return "negative";
}

export function getSentimentPercent(sentiment: number): number {
  return Math.round(sentiment * 100);
}
