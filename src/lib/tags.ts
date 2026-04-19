import type { Tag } from "../collections/tagsCollection";

export function findTagByName(tags: readonly Tag[], name: string): Tag | undefined {
  const lower = name.toLowerCase();
  return tags.find((t) => t.name.toLowerCase() === lower);
}
