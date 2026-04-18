import type { EntryWithTags } from "../templates/Overview";
import CodeBlock from "../atoms/CodeBlock";

interface EntriesListProps {
  entries: readonly EntryWithTags[];
}

export default function EntriesList({ entries }: Readonly<EntriesListProps>) {
  return <CodeBlock code={entries} />;
}
