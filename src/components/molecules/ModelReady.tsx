import StatusIndicator from "../atoms/StatusIndicator";

import { textReady } from "./modelStatus.css";

export default function ModelReady() {
  return (
    <StatusIndicator tone="ready" glyph="✓">
      <span className={textReady}>Model ready</span>
    </StatusIndicator>
  );
}
