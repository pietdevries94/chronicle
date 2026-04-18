import CodeBlock from "../atoms/CodeBlock";
import type { EntryWithTags } from "../templates/Overview";

interface EntriesListProps {
  entries: readonly EntryWithTags[];
}

export default function EntriesList({ entries }: Readonly<EntriesListProps>) {
  return <CodeBlock code={entries} />;
}
