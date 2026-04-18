// oxlint-disable unicorn/no-null -- base-ui Progress requires null for indeterminate state
import { Progress } from "@base-ui/react/progress";

interface ModelStatusBarProps {
  status: "loading" | "ready";
}

export default function ModelStatusBar({ status }: Readonly<ModelStatusBarProps>) {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
      {status === "loading" ? (
        <Progress.Root value={null}>
          <Progress.Track>
            <Progress.Indicator />
          </Progress.Track>
          Loading model…
        </Progress.Root>
      ) : (
        "✓ Model ready"
      )}
    </div>
  );
}
