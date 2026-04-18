import { useEffect, useRef, useState } from "react";

import { llm } from "../lib/llm";

export function useLlmStatus() {
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

  return {
    progress,
    status,
  };
}
