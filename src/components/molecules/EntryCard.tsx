import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import type { CardVariant } from "../../lib/date";
import { formatEntryDate, getTimeOfDayVariant } from "../../lib/date";
import AnalysisStatusBadge from "../atoms/AnalysisStatusBadge";
import IconButton from "../atoms/IconButton";
import SentimentBadge from "../atoms/SentimentBadge";
import TagPill from "../atoms/TagPill";
import TagCombobox from "./TagCombobox";

import {
  card,
  cardAmber,
  cardDark,
  cardGold,
  cardWarm,
  chipRow,
  content,
  contentDark,
  date,
  dateDark,
  footer,
  topRow,
} from "./entryCard.css";

const CARD_CLASS: Record<CardVariant, string> = {
  default: card,
  warm: cardWarm,
  amber: cardAmber,
  gold: cardGold,
  dark: cardDark,
};

interface EntryCardProps {
  entry: EntryWithTags;
  allTags: readonly Tag[];
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDelete: (entryId: string) => void;
  onRetryAnalysis: (entryId: string) => void;
}

export default function EntryCard({
  entry,
  allTags,
  onRemoveTag,
  onAddTag,
  onDelete,
  onRetryAnalysis,
}: Readonly<EntryCardProps>) {
  const sentiment = entry.sentiment ?? 0.5;
  const variant = getTimeOfDayVariant(entry.date);
  const isDark = variant === "dark";

  return (
    <div className={CARD_CLASS[variant]}>
      <div className={topRow}>
        {entry.analysisStatus === "done" ? (
          <SentimentBadge sentiment={sentiment} />
        ) : (
          <AnalysisStatusBadge
            status={entry.analysisStatus}
            onRetry={() => {
              onRetryAnalysis(entry.id);
            }}
          />
        )}
        <IconButton
          variant={isDark ? "roundInverse" : "round"}
          label="Delete entry"
          onClick={() => {
            onDelete(entry.id);
          }}
        >
          ×
        </IconButton>
      </div>
      <p className={isDark ? contentDark : content}>{entry.content}</p>
      <div className={footer}>
        <time className={isDark ? dateDark : date} dateTime={entry.date.toISOString()}>
          {formatEntryDate(entry.date)}
        </time>
        <div className={chipRow}>
          {entry.tags.map((tag) => (
            <TagPill
              key={tag.entryTagId}
              label={tag.tagName}
              taggedBy={tag.taggedBy}
              onRemove={() => {
                onRemoveTag(tag.entryTagId);
              }}
            />
          ))}
          <TagCombobox
            allTags={allTags}
            appliedTagNames={entry.tags.map((t) => t.tagName)}
            onSelect={(tagName) => {
              onAddTag(entry.id, tagName);
            }}
          />
        </div>
      </div>
    </div>
  );
}
