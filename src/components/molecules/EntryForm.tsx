import { useState } from "react";
import type { ComponentProps } from "react";

import Textarea from "../atoms/Textarea";

import { card, footer, submitBtn, textarea } from "./entryForm.css";

interface EntryFormProps {
  isLocked: boolean;
  isModelReady: boolean;
  onSubmit: (message: string) => Promise<void>;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export default function EntryForm({ isLocked, isModelReady, onSubmit }: Readonly<EntryFormProps>) {
  const [value, setValue] = useState("");

  const handleSubmit: FormSubmitHandler = (event) => {
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
    <form className={card} onSubmit={handleSubmit}>
      <Textarea
        name="message"
        placeholder="write your thoughts…"
        className={textarea}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={isLocked}
        rows={4}
      />
      <div className={footer}>
        <button
          type="submit"
          className={submitBtn}
          disabled={isLocked || !isModelReady || !value.trim()}
        >
          {isLocked ? "processing…" : "submit"}
        </button>
      </div>
    </form>
  );
}
