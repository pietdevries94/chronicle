import type { Entry } from "../collections/entriesCollection";
import { createEntry, deleteEntry } from "../collections/entriesCollection";
import { linkEntryTags, unlinkEntryTag } from "../collections/entryTagsCollection";
import type { Tag } from "../collections/tagsCollection";
import { createTag } from "../collections/tagsCollection";
import { findTagByName } from "../lib/tags";
import { useAnalysisQueue } from "./useAnalysisQueue";
import type { EntryTagRow } from "./useEntriesData";
import { useRedescribeTag } from "./useRedescribeTag";

interface UseEntryActionsArgs {
  tagsData: readonly Tag[];
  rawEntries: readonly Entry[];
  entryTags: readonly EntryTagRow[];
}

export function useEntryActions({ tagsData, rawEntries, entryTags }: UseEntryActionsArgs) {
  const { redescribeTag, cancelRedescription } = useRedescribeTag();
  const { enqueue, retry } = useAnalysisQueue();

  const findOrCreateTag = (name: string): string =>
    findTagByName(tagsData, name)?.id ?? createTag(name);

  const getOtherEntryContents = (tagId: string, excludeEntryId: string) =>
    rawEntries
      .filter(
        (e) =>
          e.id !== excludeEntryId &&
          entryTags.some((et) => et.entryId === e.id && et.tagId === tagId),
      )
      .map((e) => e.content);

  const processMessage = (msg: string) => {
    const id = createEntry({ content: msg });
    enqueue(id);
  };

  const handleRetryAnalysis = (entryId: string) => {
    retry(entryId);
  };

  const handleAddTag = (entryId: string, tagName: string) => {
    const tagId = findOrCreateTag(tagName);
    const alreadyLinked = entryTags.some((et) => et.entryId === entryId && et.tagId === tagId);
    if (alreadyLinked) return;

    linkEntryTags(entryId, tagId, "user");

    const tag = tagsData.find((t) => t.id === tagId);
    const entry = rawEntries.find((e) => e.id === entryId);
    if (!tag || !entry) return;

    void redescribeTag({
      tagId,
      tag,
      action: "added",
      entryContent: entry.content,
      otherEntries: getOtherEntryContents(tagId, entryId),
    });
  };

  const handleRemoveTag = (entryTagId: string) => {
    const link = entryTags.find((et) => et.entryTagId === entryTagId);
    if (!link || link.tagId === undefined) {
      unlinkEntryTag(entryTagId);
      return;
    }

    cancelRedescription(link.tagId);
    unlinkEntryTag(entryTagId);

    const tag = tagsData.find((t) => t.id === link.tagId);
    const entry = rawEntries.find((e) => e.id === link.entryId);
    if (!tag || !entry) return;

    void redescribeTag({
      tagId: tag.id,
      tag,
      action: "removed",
      entryContent: entry.content,
      otherEntries: getOtherEntryContents(tag.id, entry.id),
    });
  };

  const handleDeleteEntry = (entryId: string) => {
    deleteEntry(entryId, (link) => {
      cancelRedescription(link.tagId);
    });
  };

  return {
    processMessage,
    handleAddTag,
    handleRemoveTag,
    handleDeleteEntry,
    handleRetryAnalysis,
  };
}
