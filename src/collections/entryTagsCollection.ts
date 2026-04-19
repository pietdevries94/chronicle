import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { createCollection } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

import { persistence } from "./persistence";
import { deleteTag } from "./tagsCollection";

export const entryTagSchema = z.object({
  id: z.ulid(),
  entryId: z.ulid(),
  tagId: z.ulid(),
  taggedBy: z.enum(["user", "ai"]),
});

export type EntryTag = z.infer<typeof entryTagSchema>;

export const entryTagsCollection = createCollection({
  ...persistedCollectionOptions<EntryTag, string>({
    id: "entryTags",
    getKey: (item) => item.id,
    persistence,
  }),
  schema: entryTagSchema,
});

export const linkEntryTags = (
  entryId: string,
  tagIds: readonly string[] | string,
  taggedBy: "user" | "ai",
) => {
  const ids = typeof tagIds === "string" ? [tagIds] : tagIds;
  const existing = new Set(
    [...entryTagsCollection.state.values()]
      .filter((et) => et.entryId === entryId)
      .map((et) => et.tagId),
  );
  const newIds = ids.filter((tagId) => !existing.has(tagId));
  for (const tagId of newIds) {
    entryTagsCollection.insert({
      id: ulid(),
      entryId,
      tagId,
      taggedBy,
    });
  }
};

export const unlinkEntryTag = (id: string) => {
  const record = entryTagsCollection.state.get(id);
  if (!record) return;
  entryTagsCollection.delete(id);

  const hasRemaining = [...entryTagsCollection.state.values()].some(
    (et) => et.tagId === record.tagId,
  );
  if (hasRemaining) return;
  deleteTag(record.tagId);
};
