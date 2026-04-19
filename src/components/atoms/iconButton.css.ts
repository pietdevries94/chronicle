import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const buttonBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  fontFamily: vars.font.family.mono,
  lineHeight: vars.font.leading.none,
} as const;

const roundBase = {
  ...buttonBase,
  width: vars.size.controlSm,
  height: vars.size.controlSm,
  borderRadius: vars.radii.full,
  fontSize: vars.font.size.lg,
} as const;

export const round = style({
  "@layer": {
    [components]: {
      ...roundBase,
      color: vars.color.fg.faint,
      selectors: {
        "&:hover": { color: vars.color.accent.default, background: vars.color.accent.soft },
      },
    },
  },
});

export const roundInverse = style({
  "@layer": {
    [components]: {
      ...roundBase,
      color: vars.color.surface.inverse.muted,
      selectors: {
        "&:hover": { color: vars.color.accent.fg, background: vars.color.surface.inverse.border },
      },
    },
  },
});

export const bare = style({
  "@layer": {
    [components]: {
      ...buttonBase,
      fontSize: vars.font.size["2xs"],
      color: vars.color.fg.faint,
      selectors: {
        "&:hover": { color: vars.color.fg.muted },
      },
    },
  },
});
