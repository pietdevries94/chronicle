import { createCollection, localOnlyCollectionOptions } from "@tanstack/react-db";
import { ulid } from "ulid";
import { z } from "zod";

export const tagSchema = z.object({
  id: z.ulid(),
  name: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;

export const tagsCollection = createCollection(
  localOnlyCollectionOptions({
    schema: tagSchema,
    id: "ui-state",
    getKey: (item) => item.id,
  }),
);

export const createTag = (name: string) => {
  tagsCollection.insert({ id: ulid(), name });
};
