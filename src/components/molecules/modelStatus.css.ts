import { style, keyframes } from "@vanilla-extract/css";

import { components } from "../../styles/layers.css";
import { vars } from "../../styles/tokens.css";

const slide = keyframes({
  "0%": { transform: "translateX(-60px)" },
  "100%": { transform: "translateX(120px)" },
});

export const textReady = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.mono,
      fontSize: vars.font.size.sm,
      color: vars.color.status.readyFg,
    },
  },
});

export const textLoading = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.mono,
      fontSize: vars.font.size.sm,
      color: vars.color.fg.faint,
    },
  },
});

export const progressTrack = style({
  "@layer": {
    [components]: {
      background: vars.color.status.neutralBg,
      borderRadius: vars.radii.xs,
      height: "4px",
      width: "120px",
      overflow: "hidden",
    },
  },
});

export const progressIndeterminate = style({
  "@layer": {
    [components]: {
      background: vars.color.accent.default,
      height: "4px",
      width: "60px",
      borderRadius: vars.radii.xs,
      animation: `${slide} 1.4s linear infinite`,
    },
  },
});

export const progressDeterminate = style({
  "@layer": {
    [components]: {
      background: vars.color.accent.default,
      height: "4px",
      borderRadius: vars.radii.xs,
      transition: "width 0.2s ease-out",
    },
  },
});

export const errorMsgs = style({
  "@layer": {
    [components]: {
      display: "flex",
      flexDirection: "column",
      gap: vars.space["1"],
    },
  },
});

export const errorTitle = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      fontWeight: vars.font.weight.medium,
      color: vars.color.fg.default,
      margin: 0,
    },
  },
});

export const errorSubtitle = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.sm,
      color: vars.color.fg.muted,
      margin: 0,
    },
  },
});

export const retryBtn = style({
  "@layer": {
    [components]: {
      fontFamily: vars.font.family.serif,
      fontSize: vars.font.size.md,
      color: vars.color.fg.muted,
      background: "none",
      border: `1px solid ${vars.color.border.strong}`,
      borderRadius: vars.radii.full,
      padding: `${vars.space["3"]} ${vars.space["8"]}`,
      cursor: "pointer",
      selectors: {
        "&:hover": { borderColor: vars.color.fg.faint },
      },
    },
  },
});
