import { useState } from "react";
import type { ComponentProps } from "react";

import Textarea from "../atoms/Textarea";

import { card, footer, submitBtn, textarea } from "./entryForm.css";

interface EntryFormProps {
  onSubmit: (message: string) => void;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

export default function EntryForm({ onSubmit }: Readonly<EntryFormProps>) {
  const [value, setValue] = useState("");

  const handleSubmit: FormSubmitHandler = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
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
        rows={4}
      />
      <div className={footer}>
        <button type="submit" className={submitBtn} disabled={!value.trim()}>
          submit
        </button>
      </div>
    </form>
  );
}
