import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";

interface TagFormProps {
  onSubmit: (tag: string) => void;
}

export default function TagForm({ onSubmit }: Readonly<TagFormProps>) {
  function submitTag(formData: Readonly<FormData>) {
    console.log("Submitting tag", formData);
    const tag = formData.get("tag");
    if (typeof tag === "string") {
      onSubmit(tag);
    }
  }

  return (
    <form action={submitTag}>
      <TextInput name="tag" />
      <Button type="submit" />
    </form>
  );
}
