import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import { formatHeaderDate } from "../../lib/date";
import EntryForm from "../molecules/EntryForm";
import EntriesList from "../organisms/EntriesList";
import ModelStatusBar from "../organisms/ModelStatusBar";

import {
  contentColumn,
  dateLine,
  header,
  pageContainer,
  root,
  subtitle,
  title,
} from "./overview.css";

interface OverviewProps {
  allTags: readonly Tag[];
  entries: readonly EntryWithTags[];
  modelStatus: "loading" | "ready" | "error";
  modelProgress: number | undefined;
  onNewMessage: (message: string) => void;
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onRetryAnalysis: (entryId: string) => void;
}

export default function Overview({
  allTags,
  entries,
  modelStatus,
  modelProgress,
  onNewMessage,
  onRemoveTag,
  onAddTag,
  onDeleteEntry,
  onRetryAnalysis,
}: Readonly<OverviewProps>) {
  const today = new Date();

  return (
    <div className={root}>
      <div className={pageContainer}>
        <div className={contentColumn}>
          <div className={header}>
            <p className={dateLine}>{formatHeaderDate(today)}</p>
            <h1 className={title}>what happened today?</h1>
            <p className={subtitle}>write freely. the robots will sort it out later.</p>
            <EntryForm onSubmit={onNewMessage} />
          </div>
          <EntriesList
            entries={entries}
            allTags={allTags}
            onRemoveTag={onRemoveTag}
            onAddTag={onAddTag}
            onDeleteEntry={onDeleteEntry}
            onRetryAnalysis={onRetryAnalysis}
          />
        </div>
      </div>
      <ModelStatusBar status={modelStatus} progress={modelProgress} />
    </div>
  );
}
