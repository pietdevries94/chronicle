import { container, decor, subtitle, title } from "./emptyFeed.css";

export default function EmptyFeed() {
  return (
    <div className={container}>
      <div className={decor} />
      <p className={title}>nothing here yet</p>
      <p className={subtitle}>write your first entry above</p>
    </div>
  );
}
