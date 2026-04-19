import { useState } from "react";

import type { AnalysisStatus, EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import SectionHeader from "../atoms/SectionHeader";
import EntryMosaic from "../molecules/EntryMosaic";
import StatusFilterBar from "../molecules/StatusFilterBar";
import TagFilterBar from "../molecules/TagFilterBar";
import EmptyFeed from "./EmptyFeed";

import { feed } from "./entriesList.css";

interface EntriesListProps {
  entries: readonly EntryWithTags[];
  allTags: readonly Tag[];
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onRetryAnalysis: (entryId: string) => void;
}

export default function EntriesList({
  entries,
  allTags,
  onRemoveTag,
  onAddTag,
  onDeleteEntry,
  onRetryAnalysis,
}: Readonly<EntriesListProps>) {
  const [activeTagFilter, setActiveTagFilter] = useState<string | undefined>(undefined);
  const [activeStatusFilter, setActiveStatusFilter] = useState<AnalysisStatus | undefined>(
    undefined,
  );

  const filteredEntries = entries.filter((e) => {
    if (activeTagFilter !== undefined && !e.tags.some((t) => t.tagName === activeTagFilter)) {
      return false;
    }
    if (activeStatusFilter !== undefined && e.analysisStatus !== activeStatusFilter) {
      return false;
    }
    return true;
  });

  const totalCount = filteredEntries.length;
  const isEmpty = totalCount === 0;

  return (
    <div className={feed}>
      <SectionHeader
        title="the log"
        meta={`${totalCount} ${totalCount === 1 ? "entry" : "entries"}`}
      />
      {allTags.length > 0 && (
        <TagFilterBar tags={allTags} active={activeTagFilter} onChange={setActiveTagFilter} />
      )}
      <StatusFilterBar active={activeStatusFilter} onChange={setActiveStatusFilter} />
      {isEmpty ? (
        <EmptyFeed />
      ) : (
        <EntryMosaic
          entries={filteredEntries}
          allTags={allTags}
          onRemoveTag={onRemoveTag}
          onAddTag={onAddTag}
          onDeleteEntry={onDeleteEntry}
          onRetryAnalysis={onRetryAnalysis}
        />
      )}
    </div>
  );
}
