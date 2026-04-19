import { useState } from "react";

import type { Entry } from "../collections/entriesCollection";
import { createEntry, deleteEntry } from "../collections/entriesCollection";
import { linkEntryTags, unlinkEntryTag } from "../collections/entryTagsCollection";
import type { Tag } from "../collections/tagsCollection";
import { createTag, updateTagDescription } from "../collections/tagsCollection";
import { useAnalyzeMessage } from "./useAnalyzeMessage";
import type { EntryTagRow } from "./useEntriesData";
import { useRedescribeTag } from "./useRedescribeTag";

interface UseEntryActionsArgs {
  tagsData: readonly Tag[];
  rawEntries: readonly Entry[];
  entryTags: readonly EntryTagRow[];
}

function findTagByName(tags: readonly Tag[], name: string): Tag | undefined {
  const lower = name.toLowerCase();
  return tags.find((t) => t.name.toLowerCase() === lower);
}

export function useEntryActions({ tagsData, rawEntries, entryTags }: UseEntryActionsArgs) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { analyzeMessage } = useAnalyzeMessage();
  const { redescribeTag, cancelRedescription } = useRedescribeTag();

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

  const processMessage = async (msg: string) => {
    setIsProcessing(true);
    try {
      const res = await analyzeMessage(msg, tagsData);

      res.possibleTagUpdates.forEach((tag) => {
        const existingTag = findTagByName(tagsData, tag.name);
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
    isProcessing,
    processMessage,
    handleAddTag,
    handleRemoveTag,
    handleDeleteEntry,
  };
}
