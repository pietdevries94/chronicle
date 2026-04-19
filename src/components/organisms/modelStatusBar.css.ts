import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const bar = style({
  "@layer": {
    [components]: {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: vars.size.statusBar,
      background: vars.color.bg.surfaceAlt,
      borderTop: `1px solid ${vars.color.border.subtle}`,
      padding: `0 ${vars.space["16"]}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: vars.zIndex.statusBar,
    },
  },
});
