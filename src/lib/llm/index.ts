import { proxy, wrap } from "comlink";

import type { LLMWorkerApi } from "../../workers/llm.worker";
import { makeStructuredGenerate } from "./structured";

function createLLM() {
  const worker = new SharedWorker(new URL("../../workers/llm.worker.ts", import.meta.url), {
    type: "module",
    name: "chronicle-llm",
  });

  const api = wrap<LLMWorkerApi>(worker.port);
  const structuredGenerate = makeStructuredGenerate((message, options) =>
    api.generate(message, options),
  );

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
