import { getSentimentPercent, getSentimentTone } from "../../lib/sentiment";

import { negative, neutral, positive } from "./sentimentBadge.css";

const TONE_CLASS = {
  positive,
  neutral,
  negative,
} as const;

interface SentimentBadgeProps {
  sentiment: number;
}

export default function SentimentBadge({ sentiment }: Readonly<SentimentBadgeProps>) {
  const tone = getSentimentTone(sentiment);
  const percent = getSentimentPercent(sentiment);
  return <span className={TONE_CLASS[tone]}>sentiment: {percent}%</span>;
}
