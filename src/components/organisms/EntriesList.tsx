import { useState } from "react";

import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import SectionHeader from "../atoms/SectionHeader";
import EntryMosaic from "../molecules/EntryMosaic";
import TagFilterBar from "../molecules/TagFilterBar";
import EmptyFeed from "./EmptyFeed";

import { feed } from "./entriesList.css";

interface EntriesListProps {
  entries: readonly EntryWithTags[];
  allTags: readonly Tag[];
  isProcessing: boolean;
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDeleteEntry: (entryId: string) => void;
}

export default function EntriesList({
  entries,
  allTags,
  isProcessing,
  onRemoveTag,
  onAddTag,
  onDeleteEntry,
}: Readonly<EntriesListProps>) {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);

  const filteredEntries =
    activeFilter === undefined
      ? entries
      : entries.filter((e) => e.tags.some((t) => t.tagName === activeFilter));

  const showProcessing = isProcessing && activeFilter === undefined;
  const totalCount = filteredEntries.length + (showProcessing ? 1 : 0);
  const isEmpty = filteredEntries.length === 0 && !showProcessing;

  return (
    <div className={feed}>
      <SectionHeader
        title="the log"
        meta={`${totalCount} ${totalCount === 1 ? "entry" : "entries"}`}
      />
      {allTags.length > 0 && (
        <TagFilterBar tags={allTags} active={activeFilter} onChange={setActiveFilter} />
      )}
      {isEmpty ? (
        <EmptyFeed />
      ) : (
        <EntryMosaic
          entries={filteredEntries}
          allTags={allTags}
          showProcessing={showProcessing}
          onRemoveTag={onRemoveTag}
          onAddTag={onAddTag}
          onDeleteEntry={onDeleteEntry}
        />
      )}
    </div>
  );
}
