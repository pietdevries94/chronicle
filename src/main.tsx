import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/layers.css";
import "./reset.css";
import "./styles/globals.css";
import { routeTree } from "./routeTree.gen";

import { lightTheme } from "./styles/themes/light.css";

document.documentElement.classList.add(lightTheme);

if (typeof navigator.storage?.persist === "function") {
  void navigator.storage.persist();
}

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  basepath: "/chronicle",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
