import type { AnalysisStatus } from "../../collections/entriesCollection";

import { label, pillActive, pillInactive, row } from "./statusFilterBar.css";

const STATUSES: readonly AnalysisStatus[] = ["pending", "analyzing", "done", "failed"];

const STATUS_LABEL: Record<AnalysisStatus, string> = {
  pending: "queued",
  analyzing: "analyzing",
  done: "done",
  failed: "failed",
};

interface StatusFilterBarProps {
  active: AnalysisStatus | undefined;
  onChange: (status: AnalysisStatus | undefined) => void;
}

export default function StatusFilterBar({ active, onChange }: Readonly<StatusFilterBarProps>) {
  return (
    <div className={row}>
      <span className={label}>filter by status</span>
      <button
        type="button"
        className={active === undefined ? pillActive : pillInactive}
        onClick={() => {
          onChange(undefined);
        }}
      >
        all
      </button>
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          className={active === s ? pillActive : pillInactive}
          onClick={() => {
            onChange(active === s ? undefined : s);
          }}
        >
          {STATUS_LABEL[s]}
        </button>
      ))}
    </div>
  );
}
