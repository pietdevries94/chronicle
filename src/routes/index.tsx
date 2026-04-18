import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { createEntry, entriesCollection } from "../collections/entriesCollection";
import { entryTagsCollection } from "../collections/entryTagsCollection";
import { createTag, tagsCollection, updateTagDescription } from "../collections/tagsCollection";
import Overview from "../components/templates/Overview";
import { useAnalyzeMessage } from "../hooks/useAnalyzeMessage";
import { useLlmStatus } from "../hooks/useLlm";

function OverviewPage() {
  const { data: tagsData } = useLiveQuery((q) => q.from({ tags: tagsCollection }));
  const { data: rawEntries } = useLiveQuery((q) => q.from({ entries: entriesCollection }));
  const { data: entryTags } = useLiveQuery((q) =>
    q.from({ et: entryTagsCollection })
     .join({ tags: tagsCollection }, ({ et, tags }) => eq(et.tagId, tags.id))
     .select(({ et, tags }) => ({
       entryId: et.entryId,
       tagId: tags.id,
       tagName: tags.name,
     }))
  );

  const entriesData = useMemo(() => {
    const tagsByEntry = Map.groupBy(entryTags, (et) => et.entryId);
    return rawEntries.map((entry) => ({
      ...entry,
      tags: tagsByEntry.get(entry.id) ?? [],
    }));
  }, [rawEntries, entryTags]);

  const [test, setTest] = useState("");

  const { status, progress } = useLlmStatus();

  const { analyzeMessage } = useAnalyzeMessage();

  const processMessage = async (msg: string) => {
    const res = await analyzeMessage(msg, tagsData);
    setTest(typeof res === "string" ? res : JSON.stringify(res));

    const foundIds: string[] = [];

    res.possibleTagUpdates.forEach((tag) => {
      const existingTag = tagsData.find((t) => t.name.toLowerCase() === tag.name.toLowerCase());
      if (existingTag) {
        updateTagDescription(existingTag.id, tag.newDescription);
        foundIds.push(existingTag.id);
      }
    });

    const createdIds = res.possibleNewTags.map((tag) => createTag(tag.name, tag.description));

    createEntry(msg, Temporal.Now.instant(), [...foundIds, ...createdIds]);
  };

  return (
    <>
      {status} | {progress} | {test}
      <hr />
      <Overview
        tags={tagsData}
        entries={entriesData}
        onNewTag={(tag) => {
          void createTag(tag);
        }}
        onNewMessage={(msg) => {
          void processMessage(msg);
        }}
      />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
