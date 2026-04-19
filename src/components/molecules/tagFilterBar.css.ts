import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const pillBase = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: vars.size.controlSm,
  fontFamily: vars.font.family.serif,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.leading.none,
  borderRadius: vars.radii.full,
  cursor: "pointer",
} as const;

export const row = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      gap: vars.space["4"],
      flexWrap: "wrap",
    },
  },
});

export const label = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      color: vars.color.fg.muted,
    },
  },
});

export const pillActive = style({
  "@layer": {
    [components]: {
      ...pillBase,
      color: vars.color.accent.fg,
      background: vars.color.bg.inverse,
      border: `1px solid ${vars.color.border.inverse}`,
      padding: `${vars.space["2"]} ${vars.space["6"]}`,
    },
  },
});

export const pillInactive = style({
  "@layer": {
    [components]: {
      ...pillBase,
      color: vars.color.fg.muted,
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.border.control}`,
      padding: `${vars.space["2"]} ${vars.space["5"]}`,
      selectors: {
        "&:hover": { borderColor: vars.color.border.hover },
      },
    },
  },
});

export const more = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.sm,
      color: vars.color.fg.faint,
    },
  },
});
