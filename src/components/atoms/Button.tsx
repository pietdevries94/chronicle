import { Button as BaseButton } from "@base-ui/react/button";
import type { ButtonProps } from "@base-ui/react/button";

// oxlint-disable-next-line typescript/prefer-readonly-parameter-types
export default function Button(props: Readonly<ButtonProps>) {
  return <BaseButton {...props}>Submit</BaseButton>;
}
