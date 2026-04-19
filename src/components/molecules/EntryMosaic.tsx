import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import EntryCard from "./EntryCard";

import { item, mosaic } from "./entryMosaic.css";

interface EntryMosaicProps {
  entries: readonly EntryWithTags[];
  allTags: readonly Tag[];
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onRetryAnalysis: (entryId: string) => void;
}

export default function EntryMosaic({
  entries,
  allTags,
  onRemoveTag,
  onAddTag,
  onDeleteEntry,
  onRetryAnalysis,
}: Readonly<EntryMosaicProps>) {
  return (
    <div className={mosaic}>
      {entries.map((entry) => (
        <div key={entry.id} className={item}>
          <EntryCard
            entry={entry}
            allTags={allTags}
            onRemoveTag={onRemoveTag}
            onAddTag={onAddTag}
            onDelete={onDeleteEntry}
            onRetryAnalysis={onRetryAnalysis}
          />
        </div>
      ))}
    </div>
  );
}
