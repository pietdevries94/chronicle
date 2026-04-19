import type { z } from "zod";

type ErrorKind = "exception" | "json" | "schema";

const errorLabels: Record<ErrorKind, string> = {
  exception: "the previous attempt failed to run",
  json: "the previous response was not valid JSON",
  schema: "the previous response did not match the required schema",
};

function schemaDescription(schema: z.ZodType) {
  return JSON.stringify(schema.toJSONSchema());
}

function contextBlock(context: string | undefined) {
  return typeof context === "string" ? `Context:\n${context}\n\n` : "";
}

function buildInitialPrompt(schema: z.ZodType, userMessage: string, context: string | undefined) {
  return `${contextBlock(context)}Please respond only with raw JSON without markdown that matches the following schema:\n${schemaDescription(schema)}\n\nUser message:\n${userMessage}`;
}

function buildCorrectionPrompt(params: {
  readonly schema: z.ZodType;
  readonly userMessage: string;
  readonly context: string | undefined;
  readonly priorResponse: string | undefined;
  readonly errorKind: ErrorKind;
  readonly errorDescription: string;
}) {
  const { schema, userMessage, context, priorResponse, errorKind, errorDescription } = params;
  const priorBlock = priorResponse === undefined ? "" : `Previous response:\n${priorResponse}\n\n`;
  return `${contextBlock(context)}Your previous response had an error: ${errorLabels[errorKind]}.\n\n${priorBlock}Error:\n${errorDescription}\n\nPlease respond only with raw JSON without markdown that matches the following schema:\n${schemaDescription(schema)}\n\nUser message:\n${userMessage}`;
}

export { buildCorrectionPrompt, buildInitialPrompt };
export type { ErrorKind };
