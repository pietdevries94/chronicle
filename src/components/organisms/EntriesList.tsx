import type { Tag } from "../../collections/tagsCollection";
import EntryCard from "../molecules/EntryCard";
import type { EntryWithTags } from "../../collections/entriesCollection";

interface EntriesListProps {
  entries: readonly EntryWithTags[];
  allTags: readonly Tag[];
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
}

export default function EntriesList({
  entries,
  allTags,
  onRemoveTag,
  onAddTag,
}: Readonly<EntriesListProps>) {
  return entries.map((entry) => (
    <EntryCard
      key={entry.id}
      entry={entry}
      allTags={allTags}
      onRemoveTag={onRemoveTag}
      onAddTag={onAddTag}
    />
  ));
}
