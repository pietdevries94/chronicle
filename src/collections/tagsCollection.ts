import { persistedCollectionOptions } from "@tanstack/browser-db-sqlite-persistence";
import { createCollection } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

import { persistence } from "./persistence";

export const tagSchema = z.object({
  id: z.ulid(),
  name: z.string(),
  description: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;

export const tagsCollection = createCollection({
  ...persistedCollectionOptions<Tag, string>({
    id: "tags",
    getKey: (item) => item.id,
    persistence,
  }),
  schema: tagSchema,
});

export const createTag = (name: string, description = "") => {
  const id = ulid();
  tagsCollection.insert({ id, name, description });
  return id;
};

export const deleteTag = (id: string) => {
  tagsCollection.delete(id);
};

export const updateTagDescription = (id: string, description: string) => {
  if (!tagsCollection.state.get(id)) return;
  tagsCollection.update(id, (tag) => {
    tag.description = description;
  });
};
