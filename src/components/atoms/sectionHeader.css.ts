import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const header = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
});

export const label = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size["4xl"],
      color: vars.color.fg.default,
      margin: 0,
    },
  },
});

export const meta = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.xl,
      color: vars.color.fg.muted,
    },
  },
});
