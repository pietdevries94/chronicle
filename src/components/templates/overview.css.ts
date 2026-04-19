import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

export const root = style({
  "@layer": {
    [components]: {
      minHeight: "100vh",
      background: vars.color.bg.page,
      position: "relative",
    },
  },
});

export const pageContainer = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: `${vars.space["24"]} ${vars.space["32"]} ${vars.space["48"]}`,
      "@media": {
        "(max-width: 640px)": {
          padding: `${vars.space["16"]} ${vars.space["12"]} ${vars.space["32"]}`,
        },
      },
    },
  },
});

export const contentColumn = style({
  "@layer": {
    [components]: {
      width: "100%",
      maxWidth: vars.size.contentColumn,
      display: "flex",
      flexDirection: "column",
      gap: vars.space["16"],
    },
  },
});

export const header = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      gap: vars.space["10"],
    },
  },
});

export const dateLine = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      color: vars.color.fg.muted,
      margin: 0,
    },
  },
});

export const title = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.display,
      fontWeight: vars.font.weight.medium,
      color: vars.color.fg.default,
      lineHeight: vars.font.leading.tight,
      margin: 0,
      "@media": {
        "(max-width: 640px)": {
          fontSize: vars.font.size["3xl"],
        },
      },
    },
  },
});

export const subtitle = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.xl,
      color: vars.color.fg.muted,
      lineHeight: vars.font.leading.normal,
      margin: 0,
    },
  },
});
