import { useLiveQuery } from "@tanstack/react-db";
import { useCallback, useEffect, useRef } from "react";

import {
  completeEntryAnalysis,
  entriesCollection,
  setEntryStatus,
} from "../collections/entriesCollection";
import { linkEntryTags } from "../collections/entryTagsCollection";
import { createTag, tagsCollection, updateTagDescription } from "../collections/tagsCollection";
import { llm } from "../lib/llm";
import { findTagByName } from "../lib/tags";
import { useAnalyzeMessage } from "./useAnalyzeMessage";

type AnalyzeFn = ReturnType<typeof useAnalyzeMessage>["analyzeMessage"];
type AnalysisResult = Awaited<ReturnType<AnalyzeFn>>;

function applyAnalysis(entryId: string, res: AnalysisResult) {
  const tagsData = [...tagsCollection.state.values()];
  res.possibleTagUpdates.forEach((t) => {
    const existing = findTagByName(tagsData, t.name);
    if (existing) updateTagDescription(existing.id, t.newDescription);
  });
  const createdIds = res.possibleNewTags.map(
    (t) => findTagByName(tagsData, t.name)?.id ?? createTag(t.name, t.description),
  );
  const existingIds = res.relevantExistingTags.map(
    (n) => findTagByName(tagsData, n)?.id ?? createTag(n),
  );
  linkEntryTags(entryId, [...existingIds, ...createdIds], "ai");
  completeEntryAnalysis(entryId, res.sentiment);
}

async function runAnalysis(entryId: string, analyze: AnalyzeFn): Promise<void> {
  const entry = entriesCollection.state.get(entryId);
  if (!entry) return;
  try {
    await llm.load();
    setEntryStatus(entryId, "analyzing");
    const tagsSnapshot = [...tagsCollection.state.values()];
    const res = await analyze(entry.content, tagsSnapshot);
    applyAnalysis(entryId, res);
  } catch (error) {
    console.error("Analysis failed:", error);
    setEntryStatus(entryId, "failed");
  }
}

export function useAnalysisQueue() {
  const { analyzeMessage } = useAnalyzeMessage();
  const { isReady } = useLiveQuery(entriesCollection);
  const queue = useRef<string[]>([]);
  const draining = useRef(false);
  const recovered = useRef(false);

  const drain = useCallback(async () => {
    if (draining.current) return;
    draining.current = true;
    while (queue.current.length > 0) {
      const entryId = queue.current.shift();
      if (entryId === undefined) break;
      // oxlint-disable-next-line no-await-in-loop
      await runAnalysis(entryId, analyzeMessage);
    }
    draining.current = false;
  }, [analyzeMessage]);

  const enqueue = useCallback(
    (entryId: string) => {
      if (queue.current.includes(entryId)) return;
      queue.current.push(entryId);
      void drain();
    },
    [drain],
  );

  const retry = useCallback(
    (entryId: string) => {
      if (queue.current.includes(entryId)) return;
      setEntryStatus(entryId, "pending");
      queue.current.push(entryId);
      void drain();
    },
    [drain],
  );

  useEffect(() => {
    if (!isReady || recovered.current) return;
    recovered.current = true;

    const all = [...entriesCollection.state.values()];
    all
      .filter((e) => e.analysisStatus === "analyzing")
      .forEach((e) => {
        setEntryStatus(e.id, "pending");
      });

    const pending = [...entriesCollection.state.values()]
      .filter((e) => e.analysisStatus === "pending")
      .toSorted((a, b) => a.date.getTime() - b.date.getTime());
    for (const entry of pending) {
      if (!queue.current.includes(entry.id)) queue.current.push(entry.id);
    }
    void drain();
  }, [isReady, drain]);

  return { enqueue, retry };
}
