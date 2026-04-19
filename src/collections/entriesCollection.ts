import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { createCollection } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

import { linkEntryTags } from "./entryTagsCollection";
import { persistence } from "./persistence";

export const entrySchema = z.object({
  id: z.ulid(),
  content: z.string(),
  date: z.date(),
  sentiment: z.number().min(0).max(1),
});

export type Entry = z.infer<typeof entrySchema>;

export interface EntryWithTags extends Entry {
  tags: readonly {
    entryTagId: string;
    entryId: string;
    tagId: string;
    tagName: string;
    taggedBy: "user" | "ai";
  }[];
}

export const entriesCollection = createCollection({
  ...persistedCollectionOptions<Entry, string>({
    id: "entries",
    getKey: (item) => item.id,
    persistence,
  }),
  schema: entrySchema,
});

export const createEntry = (data: {
  content: string;
  tagIds: readonly string[];
  sentiment: number;
}) => {
  const id = ulid();
  entriesCollection.insert({
    id,
    content: data.content,
    date: new Date(),
    sentiment: data.sentiment,
  });
  linkEntryTags(id, data.tagIds, "ai");
  return id;
};
