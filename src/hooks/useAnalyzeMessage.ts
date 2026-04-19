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

const newTagSchema = z.object({ name: z.string(), description: z.string() });

const baseFields = {
  sentiment: z
    .number()
    .min(0)
    .max(1)
    .describe("Sentiment score from 0 to 1, where 0 is negative and 1 is positive"),
  possibleNewTags: z
    .array(newTagSchema)
    .describe(
      "A list of possible tags that could be relevant to this message that are not already in the system. If there are no possible new tags, this should be an empty array.",
    ),
};

const noTagsSchema = z.object(baseFields);

function withTagsSchema(tagNames: [string, ...string[]]) {
  const tagNameEnum = z.enum(tagNames);
  return z.object({
    ...baseFields,
    relevantExistingTags: z
      .array(tagNameEnum)
      .describe(
        "A list of tags that are already in the system and are relevant to this message. If there are no relevant tags, this should be an empty array.",
      ),
    possibleTagUpdates: z
      .array(
        z.object({
          name: tagNameEnum,
          newDescription: z.string(),
        }),
      )
      .describe(
        "A list of existing tags that could be updated with a new description to be more relevant to this message. The new description should be a greatly improved suggestion for how the tag could be updated to be more relevant to this message.",
      ),
  });
}

interface AnalysisResult {
  sentiment: number;
  relevantExistingTags: string[];
  possibleNewTags: z.infer<typeof newTagSchema>[];
  possibleTagUpdates: { name: string; newDescription: string }[];
}

async function analyzeWithTags(
  msg: string,
  tagNames: [string, ...string[]],
  context: string,
): Promise<AnalysisResult> {
  const result = await llm.structuredGenerate(withTagsSchema(tagNames), msg, {
    temperature: 0.3,
    context,
  });

  // The LLM sometimes marks existing tags as possible new tags, so we need to filter them out and move them to the relevantExistingTags array
  const tagNamesSet = new Set(tagNames);
  const relevantExistingTags = [...result.relevantExistingTags];
  const possibleNewTags = result.possibleNewTags.filter((tag) => {
    const normalized = tag.name.trim().toLowerCase();
    if (tagNamesSet.has(normalized)) {
      relevantExistingTags.push(normalized);
      return false;
    }
    return true;
  });

  return {
    sentiment: result.sentiment,
    relevantExistingTags,
    possibleNewTags,
    possibleTagUpdates: result.possibleTagUpdates,
  };
}

async function analyzeWithoutTags(msg: string, context: string): Promise<AnalysisResult> {
  const result = await llm.structuredGenerate(noTagsSchema, msg, {
    temperature: 0.3,
    context,
  });

  return {
    sentiment: result.sentiment,
    relevantExistingTags: [],
    possibleNewTags: result.possibleNewTags,
    possibleTagUpdates: [],
  };
}

export function useAnalyzeMessage() {
  const analyzeMessage = (
    msg: string,
    availableTags: readonly Readonly<Tag>[],
  ): Promise<AnalysisResult> => {
    const tagNames = availableTags.map((t) => t.name.toLowerCase());
    const context = buildContext(availableTags);
    const [first, ...rest] = tagNames;

    if (first === undefined) {
      return analyzeWithoutTags(msg, context);
    }
    return analyzeWithTags(msg, [first, ...rest], context);
  };

  return {
    analyzeMessage,
  };
}
