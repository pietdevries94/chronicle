import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const badgeBase = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: vars.radii.xs,
  padding: `${vars.space["1"]} ${vars.space["3"]}`,
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size["2xs"],
  letterSpacing: vars.font.tracking.normal,
  lineHeight: vars.font.leading.none,
} as const;

export const positive = style({
  "@layer": {
    [components]: {
      ...badgeBase,
      background: vars.color.status.positiveBg,
      border: `1px solid ${vars.color.status.positiveBorder}`,
      color: vars.color.status.positiveFg,
    },
  },
});

export const neutral = style({
  "@layer": {
    [components]: {
      ...badgeBase,
      background: vars.color.status.neutralBg,
      border: `1px solid ${vars.color.status.neutralBorder}`,
      color: vars.color.fg.muted,
    },
  },
});

export const negative = style({
  "@layer": {
    [components]: {
      ...badgeBase,
      background: vars.color.status.negativeBg,
      border: `1px solid ${vars.color.status.negativeBorder}`,
      color: vars.color.status.negativeFg,
    },
  },
});
