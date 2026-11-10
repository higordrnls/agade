import { createBrowserRouter, Navigate } from "react-router";
import { createElement } from "react";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Storefront from "./pages/Storefront";
import About from "./pages/About";

// Preserva os componentes antigos de pesquisa no código, mas os retira da navegação pública.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "loja", Component: Storefront },
      { path: "sobre", Component: About },
      ...["story", "technology", "collection", "sustainability"].map(path => ({
        path, element: createElement(Navigate, { to: "/sobre", replace: true })
      })),
      { path: "*", element: createElement(Navigate, { to: "/", replace: true }) }
    ],
  },
]);