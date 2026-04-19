import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const iconBase = {
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.sm,
} as const;

export const group = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      gap: vars.space["4"],
    },
  },
});

export const iconReady = style({
  "@layer": {
    [components]: {
      ...iconBase,
      color: vars.color.status.positiveIcon,
    },
  },
});

export const iconLoading = style({
  "@layer": {
    [components]: {
      ...iconBase,
      color: vars.color.status.loadingFg,
    },
  },
});

export const iconError = style({
  "@layer": {
    [components]: {
      ...iconBase,
      fontSize: vars.font.size.md,
      color: vars.color.status.errorFg,
    },
  },
});
