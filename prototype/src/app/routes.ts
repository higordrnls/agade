import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Story from "./pages/Story";
import Technology from "./pages/Technology";
import Collection from "./pages/Collection";
import Storefront from "./pages/Storefront";
import Sustainability from "./pages/Sustainability";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "story", Component: Story },
      { path: "technology", Component: Technology },
      { path: "collection", Component: Collection },
      { path: "loja", Component: Storefront },
      { path: "sustainability", Component: Sustainability },
    ],
  },
]);
