import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { createEntry, entriesCollection } from "../collections/entriesCollection";
import { entryTagsCollection, linkEntryTags, unlinkEntryTag } from "../collections/entryTagsCollection";
import { createTag, tagsCollection, updateTagDescription } from "../collections/tagsCollection";
import Overview from "../components/templates/Overview";
import { useAnalyzeMessage } from "../hooks/useAnalyzeMessage";
import { useLlmStatus } from "../hooks/useLlm";

// oxlint-disable-next-line max-statements
function OverviewPage() {
  const { data: tagsData } = useLiveQuery((q) => q.from({ tags: tagsCollection }));
  const { data: rawEntries } = useLiveQuery((q) =>
    q.from({ entries: entriesCollection }).orderBy(({ entries }) => entries.date, "desc"),
  );
  const { data: entryTags } = useLiveQuery((q) =>
    q
      .from({ et: entryTagsCollection })
      .join({ tags: tagsCollection }, ({ et, tags }) => eq(et.tagId, tags.id))
      .select(({ et, tags }) => ({
        entryTagId: et.id,
        entryId: et.entryId,
        tagId: tags.id,
        tagName: tags.name,
        taggedBy: et.taggedBy,
      })),
  );

  const entriesData = useMemo(() => {
    const tagsByEntry = Map.groupBy(entryTags, (et) => et.entryId);
    return rawEntries.map((entry) => ({
      ...entry,
      tags: (tagsByEntry.get(entry.id) ?? [])
        .filter((t) => t.tagId !== undefined && t.tagName !== undefined)
        .map((t) => ({
          entryTagId: t.entryTagId,
          entryId: t.entryId,
          tagId: t.tagId!,
          tagName: t.tagName!,
          taggedBy: t.taggedBy,
        })),
    }));
  }, [rawEntries, entryTags]);

  const [isProcessing, setIsProcessing] = useState(false);
  const { status } = useLlmStatus();
  const { analyzeMessage } = useAnalyzeMessage();

  const findOrCreateTag = (name: string): string =>
    tagsData.find((t) => t.name.toLowerCase() === name.toLowerCase())?.id ?? createTag(name);

  const processMessage = async (msg: string) => {
    setIsProcessing(true);
    try {
      const res = await analyzeMessage(msg, tagsData);

      res.possibleTagUpdates.forEach((tag) => {
        const existingTag = tagsData.find(
          (t) => t.name.toLowerCase() === tag.name.toLowerCase(),
        );
        if (existingTag) {
          updateTagDescription(existingTag.id, tag.newDescription);
        }
      });

      const createdIds = res.possibleNewTags.map((tag) => createTag(tag.name, tag.description));
      const existingTagIds = res.relevantExistingTags.map((name) => findOrCreateTag(name));

      createEntry({
        content: msg,
        tagIds: [...existingTagIds, ...createdIds],
        sentiment: res.sentiment,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddTag = (entryId: string, tagName: string) => {
    const tagId = findOrCreateTag(tagName);
    const alreadyLinked = entryTags.some(
      (et) => et.entryId === entryId && et.tagId === tagId,
    );
    if (!alreadyLinked) {
      linkEntryTags(entryId, tagId, "user");
    }
  };

  return (
    <Overview
      allTags={tagsData}
      entries={entriesData}
      isProcessing={isProcessing}
      modelStatus={status}
      onNewMessage={processMessage}
      onRemoveTag={unlinkEntryTag}
      onAddTag={handleAddTag}
    />
  );
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
