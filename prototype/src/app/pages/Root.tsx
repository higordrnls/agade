import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";

export default function Root() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return <CartProvider><div className="agade-experiment min-h-screen bg-[var(--agade-page)] text-[var(--agade-ink)]">
    <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--agade-card)] focus:p-3">Ir para o conteúdo</a>
    <Navigation />
    <main id="conteudo-principal" className="pt-28"><Outlet /></main>
    <Footer />
    <CartDrawer />
  </div></CartProvider>;
}