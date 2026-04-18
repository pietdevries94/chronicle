import { z } from "zod";

import { llm } from "../lib/llm";

export function useAnalyzeMessage() {
  const analyzeMessage = async (msg: string, availableTags: readonly string[]) => {
    const result = await llm.structuredGenerate(
      z.object({
        sentiment: z
          .number()
          .min(0)
          .max(1)
          .describe("Sentiment score from 0 to 1, where 0 is negative and 1 is positive"),
        relevantExistingTags: z
          // The enum values are from tagsData so that the model can only choose from existing tags
          .array(z.enum(availableTags))
          .describe(
            "A list of tags that are already in the system and are relevant to this message. Be very strict with this and only include tags that are very relevant to the message.",
          ),
        possibleNewTags: z
          .array(z.object({ name: z.string(), description: z.string() }))
          .describe(
            "A list of possible tags that could be relevant to this message. These should be tags that don't exist in the relevantExistingTags enum.",
          ),
      }),
      msg,
    );

    // The LLM sometimes marks existing tags as possible new tags, so we need to filter them out and move them to the relevantExistingTags array
    const availableTagsSet = new Set(availableTags);
    const possibleNewTags = result.possibleNewTags.filter((tag) => {
      if (availableTagsSet.has(tag.name.toLowerCase())) {
        result.relevantExistingTags.push(tag.name);
        return false;
      }
      return true;
    });

    return {
      sentiment: result.sentiment,
      relevantExistingTags: result.relevantExistingTags,
      possibleNewTags,
    };
  };

  return {
    analyzeMessage,
  };
}
