import { wrap, proxy } from "comlink";

import type { LLMWorkerApi } from "../workers/llm.worker";

function createLLM() {
  const worker = new SharedWorker(new URL("../workers/llm.worker.ts", import.meta.url), {
    type: "module",
    name: "chronicle-llm",
  });

  const api = wrap<LLMWorkerApi>(worker.port);

  return {
    load: (onProgress?: (data: unknown) => void) =>
      api.load(onProgress ? proxy(onProgress) : undefined),
    generate: api.generate,
    dispose: () => {
      worker.port.close();
    },
  };
}

export const llm = createLLM();
