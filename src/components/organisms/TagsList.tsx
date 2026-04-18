import type { Tag } from "../../collections/tagsCollection";
import CodeBlock from "../atoms/CodeBlock";

interface TagsListProps {
  tags: readonly Tag[];
}

export default function TagsList({ tags }: Readonly<TagsListProps>) {
  return <CodeBlock code={tags} />;
}
