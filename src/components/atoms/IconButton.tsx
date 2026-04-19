import type { ComponentProps, ReactNode } from "react";

import { bare, round, roundInverse } from "./iconButton.css";

type IconButtonVariant = "round" | "roundInverse" | "bare";

const VARIANT_CLASS: Record<IconButtonVariant, string> = {
  round,
  roundInverse,
  bare,
};

interface IconButtonProps extends Omit<
  ComponentProps<"button">,
  "children" | "className" | "type"
> {
  variant: IconButtonVariant;
  label: string;
  children: ReactNode;
}

export default function IconButton({
  variant,
  label,
  children,
  ...rest
}: Readonly<IconButtonProps>) {
  return (
    <button type="button" className={VARIANT_CLASS[variant]} aria-label={label} {...rest}>
      {children}
    </button>
  );
}
