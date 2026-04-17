import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/chronicle/",
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      target: "react",
    }),
    // oxlint-disable-next-line new-cap
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Chronicle",
        short_name: "Chronicle",
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    vanillaExtractPlugin(),
  ],
});
