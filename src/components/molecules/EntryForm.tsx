import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";

interface EntryFormProps {
  onSubmit: (message: string) => void;
}

export default function EntryForm({ onSubmit }: Readonly<EntryFormProps>) {
  function submitTag(formData: Readonly<FormData>) {
    const tag = formData.get("message");
    if (typeof tag === "string") {
      onSubmit(tag);
    }
  }

  return (
    <form action={submitTag}>
      <TextInput name="message" placeholder="Message" />
      <Button type="submit" />
    </form>
  );
}
