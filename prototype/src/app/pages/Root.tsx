import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}