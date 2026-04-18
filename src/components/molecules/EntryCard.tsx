import type { Tag } from "../../collections/tagsCollection";
import TagCombobox from "../atoms/TagCombobox";
import TagPill from "../atoms/TagPill";
import type { EntryWithTags } from "../../collections/entriesCollection";

interface EntryCardProps {
  entry: EntryWithTags;
  allTags: readonly Tag[];
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
}

export default function EntryCard({
  entry,
  allTags,
  onRemoveTag,
  onAddTag,
}: Readonly<EntryCardProps>) {
  return (
    <div>
      <p>{entry.content}</p>
      <time dateTime={entry.date.toISOString()}>
        {entry.date.toLocaleDateString()}
      </time>
      {" · "}
      <span>Sentiment: {Math.round(entry.sentiment * 100)}%</span>
      <div>
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
  );
}
