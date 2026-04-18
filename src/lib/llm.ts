import { wrap, proxy } from "comlink";
import type { z } from "zod";

import type { LLMWorkerApi } from "../workers/llm.worker";

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
function toStructuredMessage(schema: z.ZodType, userMessage: string) {
  const jsonSchema = JSON.stringify(schema.toJSONSchema());
  return `Please respond only with raw JSON without markdown that matches the following schema:\n${jsonSchema}\n\nUser message:\n${userMessage}`;
}

function responseToObject(response: string): unknown {
  const fenceMatch = /```(?:\w*)\n([\s\S]*?)```/.exec(response);
  const json = fenceMatch ? fenceMatch[1].trim() : response.trim();
  return JSON.parse(json);
}

function createLLM() {
  const worker = new SharedWorker(new URL("../workers/llm.worker.ts", import.meta.url), {
    type: "module",
    name: "chronicle-llm",
  });

  const api = wrap<LLMWorkerApi>(worker.port);

  async function structuredGenerate<T>(
    // oxlint-disable-next-line typescript/prefer-readonly-parameter-types
    schema: z.ZodType<T>,
    userMessage: string,
    {
      maxRetries = 3,
      maxNewTokens = 100,
    }: Readonly<{
      maxRetries?: number;
      maxNewTokens?: number;
    }> = {},
  ) {
    const message = toStructuredMessage(schema, userMessage);
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // oxlint-disable-next-line no-await-in-loop
        const response = await api.generate(message, {
          max_new_tokens: maxNewTokens,
        });

        const parsed = schema.safeParse(responseToObject(response));
        if (parsed.success) {
          return parsed.data;
        }
        console.warn(
          `LLM response did not match schema (attempt ${attempt}/${maxRetries}):`,
          parsed.error,
        );
      } catch (error) {
        console.error(`Error during LLM generation (attempt ${attempt}/${maxRetries}):`, error);
      }
    }

    throw new Error(`Failed to generate valid response after ${maxRetries} attempts`);
  }

  return {
    load: (onProgress?: (data: unknown) => void) =>
      api.load(onProgress ? proxy(onProgress) : undefined),
    generate: api.generate,
    structuredGenerate,
    dispose: () => {
      worker.port.close();
    },
  };
}

export const llm = createLLM();
