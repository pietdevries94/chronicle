import {
  badge,
  card,
  footRow,
  skel1,
  skel2,
  skel3,
  skelDate,
  skeleton,
  skelTag1,
  skelTag2,
  topRow,
} from "./entryProcessing.css";

export default function EntryProcessing() {
  return (
    <div className={card}>
      <div className={topRow}>
        <span className={badge}>analyzing…</span>
      </div>
      <div className={skeleton}>
        <div className={skel1} />
        <div className={skel2} />
        <div className={skel3} />
      </div>
      <div className={footRow}>
        <div className={skelDate} />
        <div className={skelTag1} />
        <div className={skelTag2} />
      </div>
    </div>
  );
}
