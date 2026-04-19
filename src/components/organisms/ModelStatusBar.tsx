import ModelError from "../molecules/ModelError";
import ModelLoading from "../molecules/ModelLoading";
import ModelReady from "../molecules/ModelReady";

import { bar } from "./modelStatusBar.css";

interface ModelStatusBarProps {
  status: "loading" | "ready" | "error";
  progress?: number;
  onRetry?: () => void;
}

const defaultRetry = () => {
  globalThis.location.reload();
};

export default function ModelStatusBar({
  status,
  progress,
  onRetry,
}: Readonly<ModelStatusBarProps>) {
  return (
    <div className={bar}>
      {status === "ready" && <ModelReady />}
      {status === "loading" && <ModelLoading progress={progress} />}
      {status === "error" && <ModelError onRetry={onRetry ?? defaultRetry} />}
    </div>
  );
}
