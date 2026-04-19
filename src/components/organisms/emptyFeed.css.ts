import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const container = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: vars.space["8"],
      width: "100%",
      padding: `${vars.space["32"]} ${vars.space["20"]}`,
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.border.default}`,
      borderRadius: vars.radii.lg,
    },
  },
});

export const decor = style({
  "@layer": {
    [components]: {
      width: "56px",
      height: "56px",
      borderRadius: vars.radii.circle,
      background: `radial-gradient(circle, ${vars.color.border.default}, ${vars.color.bg.page})`,
      flexShrink: 0,
    },
  },
});

export const title = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size["3xl"],
      color: vars.color.fg.muted,
      textAlign: "center",
      margin: 0,
    },
  },
});

export const subtitle = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.xl,
      color: vars.color.fg.faint,
      textAlign: "center",
      lineHeight: vars.font.leading.normal,
      margin: 0,
    },
  },
});
