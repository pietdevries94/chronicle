import type { SubmitEvent } from "react";
import { useState } from "react";

import Button from "../atoms/Button";
import Textarea from "../atoms/Textarea";

interface EntryFormProps {
  isLocked: boolean;
  isModelReady: boolean;
  onSubmit: (message: string) => Promise<void>;
}

export default function EntryForm({
  isLocked,
  isModelReady,
  onSubmit,
}: Readonly<EntryFormProps>) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLocked || !value.trim()) return;
    void (async () => {
      try {
        await onSubmit(value);
        setValue("");
      } catch (error) {
        console.error("Failed to process message:", error);
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        name="message"
        placeholder="Write your thoughts..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={isLocked}
        rows={4}
      />
      <Button
        type="submit"
        disabled={isLocked || !isModelReady || !value.trim()}
      >
        {isLocked ? "Processing..." : "Submit"}
      </Button>
    </form>
  );
}
