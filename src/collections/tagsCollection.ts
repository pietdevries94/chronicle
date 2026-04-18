import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

export const tagSchema = z.object({
  id: z.ulid(),
  name: z.string(),
  description: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;

export const tagsCollection = createCollection(
  localOnlyCollectionOptions({
    schema: tagSchema,
    id: "tags",
    getKey: (item) => item.id,
  }),
);

export const createTag = (name: string, description = "") => {
  const id = ulid();
  tagsCollection.insert({ id, name, description });
  return id;
};

export const updateTagDescription = (id: string, description: string) => {
  tagsCollection.update(id, (tag) => {
    tag.description = description;
  });
};
