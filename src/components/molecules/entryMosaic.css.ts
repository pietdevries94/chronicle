import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const mosaic = style({
  "@layer": {
    [components]: {
      columnCount: 2,
      columnGap: vars.space["8"],
      width: "100%",
      "@media": {
        "(max-width: 640px)": {
          columnCount: 1,
        },
      },
    },
  },
});

export const item = style({
  "@layer": {
    [components]: {
      breakInside: "avoid",
      marginBottom: vars.space["8"],
      display: "block",
    },
  },
});
