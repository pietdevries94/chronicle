import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const chipBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space["2"],
  cursor: "default",
  lineHeight: vars.font.leading.none,
  minHeight: vars.size.controlSm,
} as const;

export const chipAuto = style({
  "@layer": {
    [components]: {
      ...chipBase,
      fontFamily: vars.font.family.mono,
      fontSize: vars.font.size["2xs"],
      letterSpacing: vars.font.tracking.tight,
      color: vars.color.fg.muted,
      background: vars.color.status.neutralBg,
      border: `1px solid ${vars.color.border.strong}`,
      borderRadius: vars.radii.xs,
      padding: `${vars.space["1"]} ${vars.space["4"]}`,
    },
  },
});

export const chipUser = style({
  "@layer": {
    [components]: {
      ...chipBase,
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.sm,
      color: vars.color.tag.user.fg,
      background: vars.color.tag.user.bg,
      border: `1px solid ${vars.color.tag.user.border}`,
      borderRadius: vars.radii.full,
      padding: `${vars.space["1"]} ${vars.space["5"]}`,
    },
  },
});
