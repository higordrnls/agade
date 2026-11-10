import { Link, useLocation } from "react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { path: "/loja", label: "Seleção" },
  { path: "/story", label: "A AGADE" },
  { path: "/collection", label: "Arquivo" },
];

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  return (
    <nav aria-label="Navegação principal" className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#f3efe7]/95 backdrop-blur-md border-b border-[#24231f]/20 text-[#24231f]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-full flex items-center justify-between gap-8">
        <Link to="/" aria-label="AGADE — página inicial" className="text-[29px] md:text-[33px] tracking-[-0.065em] leading-none focus-visible:outline-offset-4" style={{ fontFamily: "var(--font-serif)" }}>AGADE<span className="text-[#797061]">.</span></Link>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} aria-current={location.pathname === link.path ? "page" : undefined}
              className="relative py-2 text-[11px] font-medium uppercase tracking-[0.19em] hover:opacity-60 transition-opacity focus-visible:outline-offset-4">
              {link.label}
              {location.pathname === link.path && <span className="absolute left-0 right-0 bottom-0 h-px bg-[#24231f]" aria-hidden="true"/>}
            </Link>
          ))}
        </div>
        <Link to="/loja" className="hidden md:flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.16em] border-b border-[#24231f] pb-2 hover:gap-5 transition-all focus-visible:outline-offset-4">
          Ver a seleção <ArrowUpRight size={17} aria-hidden="true"/>
        </Link>
        <button type="button" onClick={() => setIsMenuOpen(open => !open)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} aria-controls="agade-mobile-menu"
          className="md:hidden p-2 -mr-2 focus-visible:outline-offset-4">
          {isMenuOpen ? <X size={24} aria-hidden="true"/> : <Menu size={24} aria-hidden="true"/>}
        </button>
      </div>
      {isMenuOpen && (
        <div id="agade-mobile-menu" className="md:hidden absolute top-20 left-0 right-0 bg-[#f3efe7] border-b border-[#24231f]/20 px-6 py-7 shadow-lg">
          <div className="flex flex-col gap-5">
            {navLinks.map(link => <Link key={link.path} to={link.path} aria-current={location.pathname === link.path ? "page" : undefined}
              className="text-2xl tracking-tight border-b border-[#24231f]/10 pb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {link.label}
            </Link>)}
            <Link to="/technology" className="text-xs uppercase tracking-[0.2em] py-2">Pesquisa e tecnologia</Link>
            <Link to="/sustainability" className="text-xs uppercase tracking-[0.2em] py-2">Circularidade</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
