import { Link } from "react-router";
import Newsletter from "./Newsletter";
export default function Footer(){
 return <><Newsletter/><footer className="bg-[#442b27] text-[#fff1e2] px-6 sm:px-10 pt-20 pb-8">
  <div className="max-w-[1440px] mx-auto">
   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-20 border-b border-white/25">
    <div className="lg:col-span-2">
     <p className="text-xs uppercase tracking-[.2em] text-white/65 mb-7">AGADE EYEWEAR · BRASIL</p>
     <p className="text-[clamp(3.5rem,8vw,8rem)] font-semibold tracking-[-.07em] leading-[.9] max-w-4xl">Um jeito seu<br/>de ver o mundo.</p>
    </div>
    <div className="flex flex-col gap-4 text-sm">
     <p className="text-xs tracking-[.2em] uppercase text-white/60 mb-3">Navegue</p>
     <Link to="/loja" className="hover:underline underline-offset-4">Óculos de sol</Link>
     <Link to="/sobre" className="hover:underline underline-offset-4">A AGADE</Link>
     <Link to="/" className="hover:underline underline-offset-4">Página inicial</Link>
     <Link to="/conta" className="hover:underline underline-offset-4">Minha conta</Link>
     <Link to="/guia" className="hover:underline underline-offset-4">Guia de escolha</Link>
     <Link to="/ajuda" className="hover:underline underline-offset-4">Dúvidas e atendimento</Link>
     <Link to="/politicas" className="hover:underline underline-offset-4">Trocas, devoluções e frete</Link>
     <Link to="/privacidade" className="hover:underline underline-offset-4">Privacidade e dados pessoais</Link>
     <a href="mailto:atendimento@agade.com" className="hover:underline underline-offset-4">atendimento@agade.com</a>
     <a href="https://www.instagram.com/itsagade/" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">Instagram · @itsagade</a>
     <p className="mt-5 text-white/60 leading-relaxed">Curadoria de óculos solares com um olhar brasileiro. WhatsApp em preparação — número ainda não divulgado.</p>
    </div>
   </div>
   <div className="pt-7 flex flex-col sm:flex-row gap-4 justify-between text-[11px] tracking-[.14em] uppercase text-white/60">
    <p>© {new Date().getFullYear()} AGADE. Todos os direitos reservados.</p>
    <p>Compra online ainda não habilitada · Frete por conta do cliente</p>
   </div>
  </div>
 </footer></>;
}