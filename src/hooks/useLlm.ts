import { useCallback, useEffect, useRef, useState } from "react";

import { llm } from "../lib/llm";

export function useLlm() {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [progress, setProgress] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void (async () => {
      try {
        const onProgress = (pro: unknown) => {
          setProgress(JSON.stringify(pro));
        };

        await llm.load(onProgress);
        setStatus("ready");
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const generate = useCallback(
    (message: string) => {
      if (status !== "ready") {
        throw new Error("Model not loaded");
      }
      return llm.generate(message);
    },
    [status],
  );

  return {
    progress,
    status,
    generate,
  };
}
