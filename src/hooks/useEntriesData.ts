import { eq, useLiveQuery } from "@tanstack/react-db";
import { useMemo } from "react";

import type { Entry, EntryWithTags } from "../collections/entriesCollection";
import { entriesCollection } from "../collections/entriesCollection";
import { entryTagsCollection } from "../collections/entryTagsCollection";
import type { Tag } from "../collections/tagsCollection";
import { tagsCollection } from "../collections/tagsCollection";

export interface EntryTagRow {
  entryTagId: string;
  entryId: string;
  tagId: string | undefined;
  tagName: string | undefined;
  taggedBy: "user" | "ai";
}

export interface EntriesData {
  tagsData: readonly Tag[];
  rawEntries: readonly Entry[];
  entryTags: readonly EntryTagRow[];
  entriesData: readonly EntryWithTags[];
}

export function useEntriesData(): EntriesData {
  const { data: tagsData } = useLiveQuery((q) => q.from({ tags: tagsCollection }));
  const { data: rawEntries } = useLiveQuery((q) =>
    q.from({ entries: entriesCollection }).orderBy(({ entries }) => entries.date, "desc"),
  );
  const { data: entryTags } = useLiveQuery((q) =>
    q
      .from({ et: entryTagsCollection })
      .join({ tags: tagsCollection }, ({ et, tags }) => eq(et.tagId, tags.id))
      .select(({ et, tags }) => ({
        entryTagId: et.id,
        entryId: et.entryId,
        tagId: tags.id,
        tagName: tags.name,
        taggedBy: et.taggedBy,
      })),
  );

  const entriesData = useMemo<EntryWithTags[]>(() => {
    const tagsByEntry = Map.groupBy(entryTags, (et) => et.entryId);
    return rawEntries.map((entry) => ({
      ...entry,
      tags: (tagsByEntry.get(entry.id) ?? [])
        .filter((t) => t.tagId !== undefined && t.tagName !== undefined)
        .map((t) => ({
          entryTagId: t.entryTagId,
          entryId: t.entryId,
          tagId: t.tagId!,
          tagName: t.tagName!,
          taggedBy: t.taggedBy,
        })),
    }));
  }, [rawEntries, entryTags]);

  return { tagsData, rawEntries, entryTags, entriesData };
}
