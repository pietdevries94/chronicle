import type { EntryWithTags } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import EntryForm from "../molecules/EntryForm";
import EntriesList from "../organisms/EntriesList";
import ModelStatusBar from "../organisms/ModelStatusBar";

interface OverviewProps {
  allTags: readonly Tag[];
  entries: readonly EntryWithTags[];
  isProcessing: boolean;
  modelStatus: "loading" | "ready";
  onNewMessage: (message: string) => Promise<void>;
  onRemoveTag: (entryTagId: string) => void;
  onAddTag: (entryId: string, tagName: string) => void;
}

export default function Overview({
  allTags,
  entries,
  isProcessing,
  modelStatus,
  onNewMessage,
  onRemoveTag,
  onAddTag,
}: Readonly<OverviewProps>) {
  return (
    <>
      <EntryForm
        isLocked={isProcessing}
        isModelReady={modelStatus === "ready"}
        onSubmit={onNewMessage}
      />
      <EntriesList
        entries={entries}
        allTags={allTags}
        onRemoveTag={onRemoveTag}
        onAddTag={onAddTag}
      />
      <ModelStatusBar status={modelStatus} />
    </>
  );
}
