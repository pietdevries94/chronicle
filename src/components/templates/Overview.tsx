import type { Entry } from "../../collections/entriesCollection";
import type { Tag } from "../../collections/tagsCollection";
import EntryForm from "../molecules/EntryForm";
import TagForm from "../molecules/TagForm";
import EntriesList from "../organisms/EntriesList";
import TagsList from "../organisms/TagsList";

interface OverviewProps {
  tags: readonly Tag[];
  entries: readonly EntryWithTags[];
  onNewTag: (tag: string) => void;
  onNewMessage: (message: string) => void;
}

export interface EntryWithTags extends Entry {
  tags: readonly { entryId: string; tagId?: string; tagName?: string }[];
}

export default function Overview({
  onNewTag,
  onNewMessage,
  tags,
  entries,
}: Readonly<OverviewProps>) {
  return (
    <>
      <EntryForm onSubmit={onNewMessage} />
      <EntriesList entries={entries} />
      <TagForm onSubmit={onNewTag} />
      <TagsList tags={tags} />
    </>
  );
}
