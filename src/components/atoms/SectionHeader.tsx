import { header, label, meta } from "./sectionHeader.css";

interface SectionHeaderProps {
  title: string;
  meta?: string;
}

export default function SectionHeader({ title, meta: metaText }: Readonly<SectionHeaderProps>) {
  return (
    <div className={header}>
      <h2 className={label}>{title}</h2>
      {metaText !== undefined && <span className={meta}>{metaText}</span>}
    </div>
  );
}
