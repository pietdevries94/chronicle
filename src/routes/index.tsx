import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";

import { createTag, tagsCollection } from "../collections/tagsCollection";
import Overview from "../components/templates/Overview";

function OverviewPage() {
  const { data: tagsData, isLoading } = useLiveQuery((q) => q.from({ tags: tagsCollection }));

  if (isLoading) return <div>Loading...</div>;

  return <Overview tags={tagsData} onNewTag={createTag} />;
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
