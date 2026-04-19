import IconButton from "./IconButton";

import { chipAuto, chipUser } from "./tagPill.css";

interface TagPillProps {
  label: string;
  taggedBy: "user" | "ai";
  onRemove: () => void;
}

export default function TagPill({ label, taggedBy, onRemove }: Readonly<TagPillProps>) {
  const chipClass = taggedBy === "ai" ? chipAuto : chipUser;
  return (
    <span className={chipClass}>
      <span>{label}</span>
      <IconButton variant="bare" label={`Remove tag ${label}`} onClick={onRemove}>
        ×
      </IconButton>
    </span>
  );
}
