import { Input } from "@base-ui/react/input";
import type { InputProps } from "@base-ui/react/input";

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export default function TextInput(props: Readonly<InputProps>) {
  return <Input {...props} placeholder="label" />;
}
