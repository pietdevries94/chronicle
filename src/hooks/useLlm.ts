import { useEffect, useRef, useState } from "react";

import { llm } from "../lib/llm";

interface ProgressEvent {
  status?: string;
  progress?: number;
}

function toPercent(data: unknown): number | undefined {
  if (typeof data !== "object" || data === null) return undefined;
  const p = (data as ProgressEvent).progress;
  if (typeof p !== "number") return undefined;
  return Math.max(0, Math.min(100, p));
}

export function useLlmStatus() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void (async () => {
      try {
        await llm.load((data) => {
          const pct = toPercent(data);
          if (pct !== undefined) setProgress(pct);
        });
        setProgress(undefined);
        setStatus("ready");
      } catch (error) {
        console.error(error);
        setProgress(undefined);
        setStatus("error");
      }
    })();
  }, []);

  return {
    progress,
    status,
  };
}
