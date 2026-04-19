import type { ReactNode } from "react";

import { group, iconError, iconLoading, iconReady } from "./statusIndicator.css";

type Tone = "ready" | "loading" | "error";

const ICON_CLASS: Record<Tone, string> = {
  ready: iconReady,
  loading: iconLoading,
  error: iconError,
};

interface StatusIndicatorProps {
  tone: Tone;
  glyph: string;
  children: ReactNode;
}

export default function StatusIndicator({ tone, glyph, children }: Readonly<StatusIndicatorProps>) {
  return (
    <div className={group}>
      <span className={ICON_CLASS[tone]}>{glyph}</span>
      {children}
    </div>
  );
}
