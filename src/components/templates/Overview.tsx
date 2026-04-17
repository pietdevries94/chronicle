import type { Tag } from "../../collections/tagsCollection";
import TagForm from "../molecules/TagForm";
import EntriesList from "../organisms/EntriesList";

interface OverviewProps {
  tags: readonly Tag[];
  onNewTag: (tag: string) => void;
}

export default function Overview({ onNewTag, tags }: Readonly<OverviewProps>) {
  return (
    <>
      <TagForm onSubmit={onNewTag} />
      <EntriesList tags={tags} />
    </>
  );
}
