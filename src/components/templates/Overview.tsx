import type { Tag } from "../../collections/tagsCollection";
import SentimentForm from "../molecules/SentimentForm";
import TagForm from "../molecules/TagForm";
import EntriesList from "../organisms/EntriesList";

interface OverviewProps {
  tags: readonly Tag[];
  onNewTag: (tag: string) => void;
  onNewMessage: (message: string) => void;
}

export default function Overview({ onNewTag, onNewMessage, tags }: Readonly<OverviewProps>) {
  return (
    <>
      <SentimentForm onSubmit={onNewMessage} />
      <TagForm onSubmit={onNewTag} />
      <EntriesList tags={tags} />
    </>
  );
}
