import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import EntryCard from "./EntryCard";
import EntryProcessing from "./EntryProcessing";

import { item, mosaic } from "./entryMosaic.css";

interface EntryMosaicProps {
  entries: readonly EntryWithTags[];
  allTags: readonly Tag[];
  showProcessing: boolean;
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDeleteEntry: (entryId: string) => void;
}

export default function EntryMosaic({
  entries,
  allTags,
  showProcessing,
  onRemoveTag,
  onAddTag,
  onDeleteEntry,
}: Readonly<EntryMosaicProps>) {
  return (
    <div className={mosaic}>
      {showProcessing && (
        <div className={item}>
          <EntryProcessing />
        </div>
      )}
      {entries.map((entry) => (
        <div key={entry.id} className={item}>
          <EntryCard
            entry={entry}
            allTags={allTags}
            onRemoveTag={onRemoveTag}
            onAddTag={onAddTag}
            onDelete={onDeleteEntry}
          />
        </div>
      ))}
    </div>
  );
}
