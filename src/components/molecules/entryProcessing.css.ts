import { style, keyframes } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

const skelLineBase = {
  height: "16px",
  borderRadius: vars.radii.sm,
} as const;

export const card = style({
  "@layer": {
    [components]: {
      borderRadius: vars.radii.lg,
      padding: vars.space["12"],
      display: "flex",
      flexDirection: "column",
      gap: vars.space["7"],
      width: "100%",
      background: vars.color.bg.surface,
      border: `1px solid ${vars.color.accent.softBorder}`,
      boxShadow: vars.shadow.card,
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

export const badge = style({
  "@layer": {
    [components]: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: vars.radii.xs,
      padding: `${vars.space["1"]} ${vars.space["3"]}`,
      fontFamily: vars.font.family.mono,
      fontSize: vars.font.size["2xs"],
      letterSpacing: vars.font.tracking.normal,
      color: vars.color.accent.default,
      background: vars.color.accent.soft,
      border: `1px solid ${vars.color.accent.softBorder}`,
    },
  },
});

export const skeleton = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      gap: vars.space["5"],
      animation: `${pulse} 1.6s ease-in-out infinite`,
    },
  },
});

export const skel1 = style({
  "@layer": {
    [components]: {
      ...skelLineBase,
      background: vars.color.skeleton.shade1,
      width: "100%",
    },
  },
});

export const skel2 = style({
  "@layer": {
    [components]: {
      ...skelLineBase,
      background: vars.color.skeleton.shade2,
      width: "100%",
    },
  },
});

export const skel3 = style({
  "@layer": {
    [components]: {
      ...skelLineBase,
      background: vars.color.skeleton.shade3,
      width: "240px",
    },
  },
});

export const footRow = style({
  "@layer": {
    [components]: {
      display: "flex",
      alignItems: "center",
      gap: vars.space["4"],
      animation: `${pulse} 1.6s ease-in-out infinite`,
    },
  },
});

export const skelDate = style({
  "@layer": {
    [components]: {
      height: "12px",
      borderRadius: vars.radii.xs,
      background: vars.color.border.default,
      width: "120px",
    },
  },
});

export const skelTag1 = style({
  "@layer": {
    [components]: {
      height: "20px",
      borderRadius: vars.radii.xs,
      background: vars.color.skeleton.shade1,
      width: "60px",
    },
  },
});

export const skelTag2 = style({
  "@layer": {
    [components]: {
      height: "20px",
      borderRadius: vars.radii.full,
      background: vars.color.skeleton.shade4,
      width: "50px",
    },
  },
});
