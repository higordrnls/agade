import { createBrowserRouter, Navigate } from "react-router";
import { createElement } from "react";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Storefront from "./pages/Storefront";
import About from "./pages/About";
import Product from "./pages/Product";
import Account from "./pages/Account";
import Help from "./pages/Help";
import Guide from "./pages/Guide";

// Preserva os componentes antigos de pesquisa no código, mas os retira da navegação pública.
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "loja", Component: Storefront },
      { path: "produto/:slug", Component: Product },
      { path: "conta", Component: Account },
      { path: "ajuda", Component: Help },
      { path: "guia", Component: Guide },
      { path: "sobre", Component: About },
      ...["story", "technology", "collection", "sustainability"].map(path => ({
        path, element: createElement(Navigate, { to: "/sobre", replace: true })
      })),
      { path: "*", element: createElement(Navigate, { to: "/", replace: true }) }
    ],
  },
]);