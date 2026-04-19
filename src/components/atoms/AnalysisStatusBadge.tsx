import type { AnalysisStatus } from "../../collections/entriesCollection";

import { analyzing, failed, pending } from "./analysisStatusBadge.css";

type PreDoneStatus = Exclude<AnalysisStatus, "done">;

const CLASS: Record<PreDoneStatus, string> = {
  pending,
  analyzing,
  failed,
};

const LABEL: Record<PreDoneStatus, string> = {
  pending: "queued",
  analyzing: "analyzing…",
  failed: "failed — retry",
};

interface AnalysisStatusBadgeProps {
  status: PreDoneStatus;
  onRetry: () => void;
}

export default function AnalysisStatusBadge({
  status,
  onRetry,
}: Readonly<AnalysisStatusBadgeProps>) {
  if (status === "failed") {
    return (
      <button type="button" className={failed} onClick={onRetry}>
        {LABEL.failed}
      </button>
    );
  }
  return <span className={CLASS[status]}>{LABEL[status]}</span>;
}
