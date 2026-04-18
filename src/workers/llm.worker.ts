import { env, pipeline, TextStreamer } from "@huggingface/transformers";
import type { TextGenerationPipeline } from "@huggingface/transformers";
import { expose } from "comlink";

declare var self: SharedWorkerGlobalScope;

env.allowLocalModels = false;

const MODEL_ID = "onnx-community/gemma-4-E2B-it-ONNX";

let generator: TextGenerationPipeline | undefined = undefined;
let loading: Promise<void> | false = false;
const progressListeners = new Set<(data: unknown) => void>();

interface GenerateOptions {
  temperature?: number;
  max_new_tokens?: number;
  do_sample?: boolean;
}

const api = {
  load(onProgress?: (data: unknown) => void) {
    if (generator) return Promise.resolve();

    if (onProgress) progressListeners.add(onProgress);

    if (loading !== false) return loading;

    loading = (async () => {
      // oxlint-disable-next-line typescript/strict-boolean-expressions
      const device = navigator.gpu ? "webgpu" : "wasm";
      generator = await pipeline("text-generation", MODEL_ID, {
        dtype: "q4f16",
        device,
        // oxlint-disable-next-line typescript/prefer-readonly-parameter-types
        progress_callback: (data) => {
          for (const fn of progressListeners) fn(data);
        },
      });
      // Warmup: compile WebGPU shaders with a trivial generation
      await generator("<|turn>user\nhi<turn|>\n<|turn>model\n", {
        max_new_tokens: 1,
      });

      progressListeners.clear();
      loading = false;
    })();

    return loading;
  },

  async generate(message: string, options?: Readonly<GenerateOptions>) {
    if (!generator) throw new Error("Model not loaded");

    const streamer = new TextStreamer(generator.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
    });

    const prompt = `<|turn>user\n${message}<turn|>\n<|turn>model\n`;
    const output = await generator(prompt, {
      max_new_tokens: 128,
      temperature: 0.7,
      do_sample: true,
      return_full_text: false,
      streamer,
      ...options,
    });

    return output[0].generated_text;
  },
};

// oxlint-disable-next-line unicorn/prefer-add-event-listener typescript/prefer-readonly-parameter-types
self.onconnect = (e) => {
  expose(api, e.ports[0]);
};

export type LLMWorkerApi = typeof api;
