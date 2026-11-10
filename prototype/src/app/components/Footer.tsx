import { Link } from "react-router";
import Newsletter from "./Newsletter";
export default function Footer(){
 return <><Newsletter/><footer className="bg-[#111] text-white px-6 sm:px-10 pt-20 pb-8">
  <div className="max-w-[1440px] mx-auto">
   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20 border-b border-white/25">
    <div className="lg:col-span-2">
     <p className="text-xs uppercase tracking-[.2em] text-white/65 mb-7">AGADE EYEWEAR — UBERLÂNDIA / BRASIL</p>
     <p className="text-[clamp(3.5rem,8vw,8rem)] font-semibold tracking-[-.07em] leading-[.9] max-w-4xl">Um jeito seu<br/>de ver o mundo.</p>
    </div>
    <div className="flex flex-col gap-4 text-sm">
     <p className="text-xs tracking-[.2em] uppercase text-white/60 mb-3">Navegue</p>
     <Link to="/loja" className="hover:underline underline-offset-4">Óculos de sol</Link>
     <Link to="/sobre" className="hover:underline underline-offset-4">A AGADE</Link>
     <Link to="/" className="hover:underline underline-offset-4">Página inicial</Link>
     <Link to="/conta" className="hover:underline underline-offset-4">Minha conta</Link>
     <Link to="/ajuda" className="hover:underline underline-offset-4">Dúvidas e atendimento</Link>
     <p className="mt-5 text-white/60 leading-relaxed">Uma marca independente de curadoria de óculos solares. Primeira seleção em preparação.</p>
    </div>
   </div>
   <div className="pt-7 flex flex-col sm:flex-row gap-4 justify-between text-[11px] tracking-[.14em] uppercase text-white/60">
    <p>© {new Date().getFullYear()} AGADE. Todos os direitos reservados.</p>
    <p>Compra online ainda não habilitada · Uberlândia, MG</p>
   </div>
  </div>
 </footer></>;
}