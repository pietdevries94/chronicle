import Button from "../atoms/Button";
import TextInput from "../atoms/TextInput";

interface SentimentFormProps {
  onSubmit: (message: string) => void;
}

export default function SentimentForm({ onSubmit }: Readonly<SentimentFormProps>) {
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
