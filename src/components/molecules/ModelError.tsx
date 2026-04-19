import StatusIndicator from "../atoms/StatusIndicator";

import { errorMsgs, errorSubtitle, errorTitle, retryBtn } from "./modelStatus.css";

interface ModelErrorProps {
  onRetry: () => void;
}

export default function ModelError({ onRetry }: Readonly<ModelErrorProps>) {
  return (
    <>
      <StatusIndicator tone="error" glyph="✕">
        <div className={errorMsgs}>
          <p className={errorTitle}>Model failed to load</p>
          <p className={errorSubtitle}>Your browser may not support WebGPU</p>
        </div>
      </StatusIndicator>
      <button type="button" className={retryBtn} onClick={onRetry}>
        retry
      </button>
    </>
  );
}
