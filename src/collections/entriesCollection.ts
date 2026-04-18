import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";
import { linkEntryTags } from "./entryTagsCollection";

export const entrySchema = z.object({
  id: z.ulid(),
  content: z.string(),
  date: z.date(),
});

export type Entry = z.infer<typeof entrySchema>;

export const entriesCollection = createCollection(
  localOnlyCollectionOptions({
    schema: entrySchema,
    id: "entries",
    getKey: (item) => item.id,
  }),
);

export const createEntry = (
  content: string,
  date: Readonly<Temporal.Instant>,
  tagIds: readonly string[],
) => {
  const id = ulid();
  entriesCollection.insert({
    id,
    content,
    date: new Date(date.epochMilliseconds),
  });
  linkEntryTags(id, tagIds);
  return id;
};
