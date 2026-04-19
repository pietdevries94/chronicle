import { style } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const cardBase = {
  borderRadius: vars.radii.lg,
  padding: vars.space["12"],
  display: "flex",
  flexDirection: "column",
  gap: vars.space["7"],
  width: "100%",
  boxShadow: vars.shadow.card,
} as const;

const contentBase = {
  fontFamily: vars.font.family.serif,
  fontSize: vars.font.size["2xl"],
  lineHeight: vars.font.leading.loose,
  margin: 0,
} as const;

const dateBase = {
  fontFamily: vars.font.family.serif,
  fontSize: vars.font.size.sm,
} as const;

export const card = style({
  "@layer": {
    [components]: {
      ...cardBase,
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.border.default}`,
    },
  },
});

export const cardWarm = style({
  "@layer": {
    [components]: {
      ...cardBase,
      background: vars.color.surface.tier1.bg,
      border: `1px solid ${vars.color.surface.tier1.border}`,
    },
  },
});

export const cardAmber = style({
  "@layer": {
    [components]: {
      ...cardBase,
      background: vars.color.surface.tier2.bg,
      border: `1px solid ${vars.color.surface.tier2.border}`,
    },
  },
});

export const cardGold = style({
  "@layer": {
    [components]: {
      ...cardBase,
      background: vars.color.surface.tier3.bg,
      border: `1px solid ${vars.color.surface.tier3.border}`,
    },
  },
});

export const cardDark = style({
  "@layer": {
    [components]: {
      ...cardBase,
      background: vars.color.surface.inverse.bg,
      border: `1px solid ${vars.color.surface.inverse.border}`,
      boxShadow: vars.shadow.cardInverse,
    },
  },
});

export const topRow = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  },
});

export const content = style({
  "@layer": {
    [components]: {
      ...contentBase,
      color: vars.color.fg.default,
    },
  },
});

export const contentDark = style({
  "@layer": {
    [components]: {
      ...contentBase,
      color: vars.color.surface.inverse.fg,
    },
  },
});

export const footer = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      gap: vars.space["5"],
      width: "100%",
    },
  },
});

export const date = style({
  "@layer": {
    [components]: {
      ...dateBase,
      color: vars.color.fg.faint,
    },
  },
});

export const dateDark = style({
  "@layer": {
    [components]: {
      ...dateBase,
      color: vars.color.surface.inverse.muted,
    },
  },
});

export const chipRow = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: vars.space["3"],
      width: "100%",
    },
  },
});
