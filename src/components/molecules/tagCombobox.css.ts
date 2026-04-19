import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const input = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.sm,
      lineHeight: vars.font.leading.none,
      minHeight: vars.size.controlSm,
      color: vars.color.fg.default,
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.border.control}`,
      borderRadius: vars.radii.full,
      padding: `${vars.space["1"]} ${vars.space["4"]}`,
      outline: "none",
      width: vars.size.inputFocused,
      boxSizing: "border-box",
      selectors: {
        "&::placeholder": { color: vars.color.fg.faint },
        "&:focus": { borderColor: vars.color.border.hoverStrong },
      },
    },
  },
});

export const popup = style({
  "@layer": {
    [components]: {
      background: vars.color.bg.surface,
      borderRadius: vars.radii.md,
      boxShadow: vars.shadow.popup,
      width: vars.size.inputFocused,
      boxSizing: "border-box",
      overflow: "hidden",
      zIndex: vars.zIndex.popup,
      border: `1px solid ${vars.color.border.default}`,
    },
  },
});

export const option = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      color: vars.color.fg.default,
      padding: `0 ${vars.space["6"]}`,
      height: vars.size.controlMd,
      cursor: "pointer",
      selectors: {
        "&[data-highlighted]": { background: vars.color.bg.page },
        "&:hover": { background: vars.color.bg.page },
      },
    },
  },
});

export const createOption = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      color: vars.color.accent.default,
      padding: `${vars.space["4"]} ${vars.space["6"]}`,
      borderTop: `1px solid ${vars.color.border.default}`,
      cursor: "pointer",
      selectors: {
        "&[data-highlighted]": { background: vars.color.accent.soft },
        "&:hover": { background: vars.color.accent.soft },
      },
    },
  },
});
