import type { TextareaHTMLAttributes } from "react";

export default function Textarea(props: Readonly<TextareaHTMLAttributes<HTMLTextAreaElement>>) {
  return <textarea {...props} />;
}
