import { Button } from "@base-ui/react";
import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { createTag, tagsCollection } from "../collections/tagsCollection";
import Overview from "../components/templates/Overview";
import { useLlm } from "../hooks/useLlm";

function OverviewPage() {
  const { data: tagsData, isLoading } = useLiveQuery((q) => q.from({ tags: tagsCollection }));

  const [test, setTest] = useState("");

  const { status, generate, progress } = useLlm();

  const onClick = async () => {
    const res = await generate("Hi! How are you?");
    setTest(typeof res === "string" ? res : JSON.stringify(res));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Button
        onClick={() => {
          void onClick();
        }}
      >
        {status} | {progress}
      </Button>
      {test}
      <Overview tags={tagsData} onNewTag={createTag} />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
