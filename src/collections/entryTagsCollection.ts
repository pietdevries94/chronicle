import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

export const entryTagSchema = z.object({
  id: z.ulid(),
  entryId: z.ulid(),
  tagId: z.ulid(),
  taggedBy: z.enum(["user", "ai"]),
});

export type EntryTag = z.infer<typeof entryTagSchema>;

export const entryTagsCollection = createCollection(
  localOnlyCollectionOptions({
    schema: entryTagSchema,
    id: "entryTags",
    getKey: (item) => item.id,
  }),
);

export const linkEntryTags = (
  entryId: string,
  tagIds: readonly string[] | string,
  taggedBy: "user" | "ai",
) => {
  const ids = typeof tagIds === "string" ? [tagIds] : tagIds;
  for (const tagId of ids) {
    entryTagsCollection.insert({
      id: ulid(),
      entryId,
      tagId,
      taggedBy,
    });
  }
};

export const unlinkEntryTag = (id: string) => {
  entryTagsCollection.delete(id);
};
