import { z } from "zod";

import type { ErrorKind } from "./prompts";
import { buildCorrectionPrompt, buildInitialPrompt } from "./prompts";

interface StructuredGenerateOptions {
  maxRetries?: number;
  maxNewTokens?: number;
  temperature?: number;
  context?: string;
}

interface GenerateCallOptions {
  max_new_tokens?: number;
  temperature?: number;
}

type GenerateFn = (message: string, options?: Readonly<GenerateCallOptions>) => Promise<string>;

type AttemptOutcome<T> =
  | { readonly kind: "success"; readonly data: T }
  | {
      readonly kind: "error";
      readonly errorKind: ErrorKind;
      readonly description: string;
      readonly priorResponse: string | undefined;
      readonly cause: unknown;
    };

interface AttemptParams<T> {
  readonly schema: z.ZodType<T>;
  readonly generate: GenerateFn;
  readonly prompt: string;
  readonly maxNewTokens: number;
  readonly temperature: number;
}

function describeException(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function tryParseJson(
  response: string,
): { readonly ok: true; readonly data: unknown } | { readonly ok: false; readonly error: string } {
  const fenceMatch = /```(?:\w*)\n([\s\S]*?)```/.exec(response);
  const json = fenceMatch ? fenceMatch[1].trim() : response.trim();
  try {
    return { ok: true, data: JSON.parse(json) };
  } catch (error) {
    return { ok: false, error: describeException(error) };
  }
}

// oxlint-disable-next-line max-statements
async function runAttempt<T>(params: AttemptParams<T>): Promise<AttemptOutcome<T>> {
  const { schema, generate, prompt, maxNewTokens, temperature } = params;

  let response = "";
  try {
    response = await generate(prompt, { max_new_tokens: maxNewTokens, temperature });
  } catch (error) {
    return {
      kind: "error",
      errorKind: "exception",
      description: describeException(error),
      priorResponse: undefined,
      cause: error,
    };
  }

  const parsed = tryParseJson(response);
  if (!parsed.ok) {
    return {
      kind: "error",
      errorKind: "json",
      description: parsed.error,
      priorResponse: response,
      cause: new Error(parsed.error),
    };
  }

  const validated = schema.safeParse(parsed.data);
  if (!validated.success) {
    return {
      kind: "error",
      errorKind: "schema",
      description: z.prettifyError(validated.error),
      priorResponse: response,
      cause: validated.error,
    };
  }

  return { kind: "success", data: validated.data };
}

function makeStructuredGenerate(generate: GenerateFn) {
  // oxlint-disable-next-line max-statements
  return async function structuredGenerate<T>(
    schema: z.ZodType<T>,
    userMessage: string,
    {
      maxRetries = 3,
      maxNewTokens = 200,
      temperature = 0.7,
      context,
    }: Readonly<StructuredGenerateOptions> = {},
  ): Promise<T> {
    const budgets: Record<ErrorKind, number> = {
      exception: maxRetries,
      json: maxRetries,
      schema: maxRetries,
    };

    let prompt = buildInitialPrompt(schema, userMessage, context);
    let attempt = 1;
    let lastError: unknown = undefined;

    while (budgets.exception > 0 && budgets.json > 0 && budgets.schema > 0) {
      const retryTemperature = Math.max(0.1, temperature - (attempt - 1) * 0.1);
      // oxlint-disable-next-line no-await-in-loop
      const outcome = await runAttempt({
        schema,
        generate,
        prompt,
        maxNewTokens,
        temperature: retryTemperature,
      });

      if (outcome.kind === "success") return outcome.data;

      lastError = outcome.cause;
      budgets[outcome.errorKind]--;
      if (budgets[outcome.errorKind] <= 0) break;

      console.warn(
        `LLM ${outcome.errorKind} error (budget left: ${budgets[outcome.errorKind]}):`,
        outcome.description,
      );
      prompt = buildCorrectionPrompt({
        schema,
        userMessage,
        context,
        priorResponse: outcome.priorResponse,
        errorKind: outcome.errorKind,
        errorDescription: outcome.description,
      });
      attempt++;
    }

    throw new Error(
      `Failed to generate valid response after ${attempt} attempt(s): ${describeException(lastError)}`,
    );
  };
}

export { makeStructuredGenerate };
export type { StructuredGenerateOptions };
