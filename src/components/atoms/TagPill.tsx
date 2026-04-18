import Button from "./Button";

interface TagPillProps {
  label: string;
  taggedBy: "user" | "ai";
  onRemove: () => void;
}

export default function TagPill({ label, taggedBy, onRemove }: Readonly<TagPillProps>) {
  const emoji = taggedBy === "ai" ? "🤖" : "👤";
  return (
    <span>
      {emoji} {label}{" "}
      <Button type="button" onClick={onRemove}>
        ✕
      </Button>
    </span>
  );
}
