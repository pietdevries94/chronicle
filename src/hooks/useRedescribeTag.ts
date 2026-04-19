import { useCallback, useRef } from "react";
import { z } from "zod";

import type { Tag } from "../collections/tagsCollection";
import { tagsCollection, updateTagDescription } from "../collections/tagsCollection";
import { llm } from "../lib/llm";

const redescribeSchema = z.object({
  description: z.string().describe("The updated tag description"),
});

async function runRedescription({
  tagId,
  tag,
  context,
  controller,
}: {
  tagId: string;
  tag: Pick<Tag, "name" | "description">;
  context: string;
  controller: AbortController;
}) {
  try {
    const result = await llm.structuredGenerate(
      redescribeSchema,
      `Write an updated description for the tag "${tag.name}" that better reflects what this tag should cover. Keep it concise.`,
      { temperature: 0.3, context },
    );
    if (controller.signal.aborted) return;
    updateTagDescription(tagId, result.description);
  } catch (error: unknown) {
    if (controller.signal.aborted) return;
    console.warn("Failed to redescribe tag:", error);
  }
}

function buildContext({
  tag,
  action,
  entryContent,
  otherEntries,
}: {
  tag: Pick<Tag, "name" | "description">;
  action: "added" | "removed";
  entryContent: string;
  otherEntries: readonly string[];
}) {
  const actionExplanation =
    action === "added"
      ? `A user manually added the tag "${tag.name}" to this entry, meaning the current description might be too narrow.`
      : `A user manually removed the tag "${tag.name}" from this entry, meaning the current description might be too broad.`;

  const otherEntriesPart =
    otherEntries.length > 0
      ? `\n\nOther entries currently tagged with "${tag.name}":\n${otherEntries.map((e) => `- ${e}`).join("\n")}`
      : "";

  return `You manage tag descriptions for a journaling app. Tags are factual categories — feelings are not relevant for tag descriptions.

Tag: "${tag.name}"
Current description: "${tag.description}"

${actionExplanation}

The entry in question:
"${entryContent}"${otherEntriesPart}`;
}

export function useRedescribeTag() {
  const pendingRef = useRef(new Map<string, AbortController>());

  const cancelRedescription = useCallback((tagId: string) => {
    const controller = pendingRef.current.get(tagId);
    if (!controller) return;
    controller.abort();
    pendingRef.current.delete(tagId);
  }, []);

  const redescribeTag = useCallback(
    async ({
      tagId,
      tag,
      action,
      entryContent,
      otherEntries,
    }: {
      tagId: string;
      tag: Pick<Tag, "name" | "description">;
      action: "added" | "removed";
      entryContent: string;
      otherEntries: readonly string[];
    }) => {
      if (!tagsCollection.state.get(tagId)) return;

      cancelRedescription(tagId);
      const controller = new AbortController();
      pendingRef.current.set(tagId, controller);

      const context = buildContext({ tag, action, entryContent, otherEntries });
      await runRedescription({ tagId, tag, context, controller });
      pendingRef.current.delete(tagId);
    },
    [cancelRedescription],
  );

  return { redescribeTag, cancelRedescription };
}
