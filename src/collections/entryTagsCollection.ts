import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

export const entryTagSchema = z.object({
  id: z.ulid(),
  entryId: z.string(),
  tagId: z.ulid(),
});

export type EntryTag = z.infer<typeof entryTagSchema>;

export const entryTagsCollection = createCollection(
  localOnlyCollectionOptions({
    schema: entryTagSchema,
    id: "entryTags",
    getKey: (item) => item.id,
  }),
);

export const linkEntryTags = (entryId: string, tagIds: readonly string[]) => {
  for (const tagId of tagIds) {
    entryTagsCollection.insert({
      id: ulid(),
      entryId,
      tagId,
    });
  }
};
