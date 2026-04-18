import { z } from "zod";

import type { Tag } from "../collections/tagsCollection";
import { llm } from "../lib/llm";

function buildContext(tags: readonly Tag[]) {
  return `You are an assistant that analyzes messages and suggests relevant tags for them. Here are the existing tags in the system:\n\n${tags
    .map((t) => `- ${t.name}: ${t.description}`)
    .join(
      "\n",
    )}\n\nWhen analyzing a message, you should only suggest tags that are very relevant to the message. If there are no relevant tags, you can suggest possible new tags that could be relevant to the message. Be very strict with this and only include tags that are very relevant to the message.\nTags should be be factual, seen as categories. Feelings are not relevant for tags or their descriptions.`;
}

function buildSchema(tagNames: readonly string[]) {
  return z.object({
    sentiment: z
      .number()
      .min(0)
      .max(1)
      .describe("Sentiment score from 0 to 1, where 0 is negative and 1 is positive"),
    relevantExistingTags: z
      .array(z.enum(tagNames))
      .describe(
        "A list of tags that are already in the system and are relevant to this message. If there are no relevant tags, this should be an empty array.",
      ),
    possibleNewTags: z
      .array(z.object({ name: z.string(), description: z.string() }))
      .describe(
        "A list of possible tags that could be relevant to this message that are not already in the system. If there are no possible new tags, this should be an empty array.",
      ),
    possibleTagUpdates: z
      .array(
        z.object({
          name: z.enum(tagNames),
          newDescription: z.string(),
        }),
      )
      .describe(
        "A list of existing tags that could be updated with a new description to be more relevant to this message. The new description should be a greatly improved suggestion for how the tag could be updated to be more relevant to this message.",
      ),
  });
}

export function useAnalyzeMessage() {
  const analyzeMessage = async (msg: string, availableTags: readonly Readonly<Tag>[]) => {
    const tagNames = availableTags.map((t) => t.name.toLowerCase());
    const result = await llm.structuredGenerate(buildSchema(tagNames), msg, {
      temperature: 0.3,
      context: buildContext(availableTags),
    });

    // The LLM sometimes marks existing tags as possible new tags, so we need to filter them out and move them to the relevantExistingTags array
    const availableTagsSet = new Set(tagNames);
    const possibleNewTags = result.possibleNewTags.filter((tag) => {
      if (availableTagsSet.has(tag.name.toLowerCase())) {
        result.relevantExistingTags.push(tag.name);
        return false;
      }
      return true;
    });

    return {
      ...result,
      possibleNewTags,
    };
  };

  return {
    analyzeMessage,
  };
}
