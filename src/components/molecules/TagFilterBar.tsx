import type { Tag } from "../../collections/tagsCollection";

import { label, more, pillActive, pillInactive, row } from "./tagFilterBar.css";

const MAX_PILLS = 6;

interface TagFilterBarProps {
  tags: readonly Tag[];
  active: string | undefined;
  onChange: (name: string | undefined) => void;
}

export default function TagFilterBar({ tags, active, onChange }: Readonly<TagFilterBarProps>) {
  const visible = tags.slice(0, MAX_PILLS).map((t) => t.name);
  const hiddenCount = Math.max(0, tags.length - MAX_PILLS);

  return (
    <div className={row}>
      <span className={label}>filter by tag</span>
      <button
        type="button"
        className={active === undefined ? pillActive : pillInactive}
        onClick={() => {
          onChange(undefined);
        }}
      >
        all
      </button>
      {visible.map((name) => (
        <button
          key={name}
          type="button"
          className={active === name ? pillActive : pillInactive}
          onClick={() => {
            onChange(active === name ? undefined : name);
          }}
        >
          {name}
        </button>
      ))}
      {hiddenCount > 0 && <span className={more}>+{hiddenCount} more</span>}
    </div>
  );
}
