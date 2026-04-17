import type { Tag } from "../../collections/tagsCollection";
import CodeBlock from "../atoms/CodeBlock";

interface EntriesListProps {
  tags: readonly Tag[];
}

export default function EntriesList({ tags }: Readonly<EntriesListProps>) {
  return <CodeBlock code={tags} />;
}
