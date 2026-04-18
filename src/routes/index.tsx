import { useLiveQuery } from "@tanstack/react-db";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { createTag, tagsCollection } from "../collections/tagsCollection";
import Overview from "../components/templates/Overview";
import { useAnalyzeMessage } from "../hooks/useAnalyzeMessage";
import { useLlmStatus } from "../hooks/useLlm";

function OverviewPage() {
  const { data: tagsData, isLoading } = useLiveQuery((q) => q.from({ tags: tagsCollection }));

  const [test, setTest] = useState("");

  const { status, progress } = useLlmStatus();

  const { analyzeMessage } = useAnalyzeMessage();

  const processMessage = async (msg: string) => {
    const res = await analyzeMessage(msg, tagsData?.map((t) => t.name) ?? []);
    setTest(typeof res === "string" ? res : JSON.stringify(res));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {status} | {progress} | {test}
      <hr />
      <Overview
        tags={tagsData}
        onNewTag={createTag}
        onNewMessage={(msg) => {
          void processMessage(msg);
        }}
      />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: OverviewPage,
});
