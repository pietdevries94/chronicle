import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const card = style({
  "@layer": {
    [components]: {
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.border.default}`,
      borderRadius: vars.radii.lg,
      padding: vars.space["12"],
      display: "flex",
      flexDirection: "column",
      gap: vars.space["10"],
      boxShadow: vars.shadow.card,
      width: "100%",
    },
  },
});

export const textarea = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size["2xl"],
      color: vars.color.fg.default,
      background: "transparent",
      border: "none",
      outline: "none",
      resize: "none",
      width: "100%",
      minHeight: "160px",
      padding: 0,
      lineHeight: vars.font.leading.loose,
      selectors: {
        "&::placeholder": { color: vars.color.fg.faint },
        "&:disabled": { opacity: 0.5 },
      },
    },
  },
});

export const footer = style({
  "@layer": {
    [components]: {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
});

export const submitBtn = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.lg,
      fontWeight: vars.font.weight.medium,
      color: vars.color.accent.fg,
      background: vars.color.accent.default,
      border: "none",
      borderRadius: vars.radii.full,
      padding: `${vars.space["5"]} ${vars.space["12"]}`,
      cursor: "pointer",
      selectors: {
        "&:disabled": { opacity: 0.4, cursor: "not-allowed" },
        "&:hover:not(:disabled)": { background: vars.color.accent.hover },
      },
    },
  },
});
