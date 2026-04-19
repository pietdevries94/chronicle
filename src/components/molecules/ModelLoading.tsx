import StatusIndicator from "../atoms/StatusIndicator";

import {
  progressDeterminate,
  progressIndeterminate,
  progressTrack,
  textLoading,
} from "./modelStatus.css";

interface ModelLoadingProps {
  progress: number | undefined;
}

export default function ModelLoading({ progress }: Readonly<ModelLoadingProps>) {
  const hasProgress = typeof progress === "number";
  return (
    <>
      <StatusIndicator tone="loading" glyph="○">
        <span className={textLoading}>
          {hasProgress ? `Loading model… ${Math.round(progress)}%` : "Loading model…"}
        </span>
      </StatusIndicator>
      <div className={progressTrack}>
        {hasProgress ? (
          <div className={progressDeterminate} style={{ width: `${progress}%` }} />
        ) : (
          <div className={progressIndeterminate} />
        )}
      </div>
    </>
  );
}
