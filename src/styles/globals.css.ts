import { globalStyle } from "@vanilla-extract/css";

import { base } from "./layers.css";
import { vars } from "./tokens.css";

globalStyle("body", {
  "@layer": {
    [base]: {
      background: vars.color.bg.page,
      color: vars.color.fg.default,
      fontFamily: vars.font.family.serif,
    },
  },
});
