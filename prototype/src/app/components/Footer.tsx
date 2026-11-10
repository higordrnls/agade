import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const links = [
  { path: "/loja", label: "Seleção comercial" },
  { path: "/story", label: "Nossa história" },
  { path: "/collection", label: "Arquivo conceitual" },
  { path: "/technology", label: "Pesquisa e tecnologia" },
  { path: "/sustainability", label: "Circularidade" },
];

export default function Footer() {
  return (
    <footer className="bg-[#252721] text-[#eee9dc] px-6 md:px-12 pt-20 md:pt-28 pb-8">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid md:grid-cols-12 gap-14 border-b border-white/20 pb-20">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#c3bfb0] mb-8">AGADE / Curadoria independente</p>
            <p className="text-[clamp(3.3rem,7.4vw,9rem)] leading-[0.95] tracking-[-0.065em]" style={{ fontFamily: "var(--font-serif)" }}>Ver é uma<br/><em>escolha.</em></p>
          </div>
          <div className="md:col-span-3 md:col-start-10 flex flex-col gap-10 md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#bcb8ac] mb-5">Navegue</p>
              <ul className="space-y-3">
                {links.map(link => <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-white/60 transition-colors focus-visible:outline-offset-4">{link.label}</Link>
                </li>)}
              </ul>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#bcb8ac] mb-3">Origem</p>
              <p className="text-sm">Uberlândia, Minas Gerais<br/>Brasil</p>
              <Link to="/loja" className="inline-flex items-center gap-3 mt-7 text-[11px] uppercase tracking-[0.2em] border-b border-[#eee9dc] pb-2">
                Explorar seleção <ArrowUpRight size={16} aria-hidden="true"/>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 text-[10px] sm:text-xs tracking-[0.13em] uppercase text-[#bcb8ac]">
          <span>© {new Date().getFullYear()} AGADE</span>
          <span>Curadoria em desenvolvimento · Compra online indisponível</span>
        </div>
      </div>
    </footer>
  );
}
