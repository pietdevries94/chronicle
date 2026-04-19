import { createFileRoute } from "@tanstack/react-router";

import Overview from "../components/templates/Overview";
import { useEntriesData } from "../hooks/useEntriesData";
import { useEntryActions } from "../hooks/useEntryActions";
import { useLlmStatus } from "../hooks/useLlm";

function OverviewPage() {
  const { tagsData, rawEntries, entryTags, entriesData } = useEntriesData();
  const { status, progress } = useLlmStatus();
  const { processMessage, handleAddTag, handleRemoveTag, handleDeleteEntry, handleRetryAnalysis } =
    useEntryActions({ tagsData, rawEntries, entryTags });

  return (
    <Overview
      allTags={tagsData}
      entries={entriesData}
      modelStatus={status}
      modelProgress={progress}
      onNewMessage={processMessage}
      onRemoveTag={handleRemoveTag}
      onAddTag={handleAddTag}
      onDeleteEntry={handleDeleteEntry}
      onRetryAnalysis={handleRetryAnalysis}
    />
  );
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
