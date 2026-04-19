import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const feed = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      gap: vars.space["12"],
      width: "100%",
    },
  },
});
