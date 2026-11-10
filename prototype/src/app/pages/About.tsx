import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function About(){
 return <div className="bg-white text-[#181818]">
  <section className="relative min-h-[570px] h-[70svh] max-h-[850px] bg-[#242a2c] overflow-hidden flex items-end">
   <img src="/imagens/catalog/drop-01/11-aura.png" alt="Composição visual de estudo da identidade AGADE" className="absolute inset-0 w-full h-full object-cover" />
   <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
   <div className="relative w-full max-w-[1500px] mx-auto px-6 sm:px-10 pb-16 md:pb-24 text-white">
    <p className="text-xs uppercase tracking-[.2em] mb-6 text-white/75">NOSSA MARCA / BRASIL</p>
    <h1 className="font-normal text-[clamp(3.3rem,7vw,7.8rem)] leading-[1.02] tracking-[-.045em] max-w-[900px]" style={{fontFamily:"var(--font-serif)"}}>O olhar é parte de quem somos.</h1>
    <p className="text-[10px] uppercase tracking-[.15em] text-white/75 mt-6">Imagem de estudo visual</p>
   </div>
  </section>
  <section className="max-w-[1450px] mx-auto px-6 sm:px-10 py-20 md:py-32 grid md:grid-cols-12 gap-10">
    <div className="md:col-span-3 text-[11px] tracking-[.2em] uppercase text-[#24469a]">AGADE / Sobre</div>
    <div className="md:col-span-9">
      <h2 className="text-3xl sm:text-5xl leading-tight font-normal max-w-4xl" style={{fontFamily:"var(--font-serif)"}}>Acessórios são mais do que detalhes. Eles revelam escolhas, movimentos e formas de expressão.</h2>
      <div className="grid sm:grid-cols-2 gap-10 text-base leading-relaxed text-[#505050] mt-12 max-w-4xl">
       <p>A AGADE é uma marca independente de curadoria de óculos solares, com uma perspectiva brasileira. Estamos construindo nossa primeira seleção de peças para acompanhar diferentes estilos e rotinas.</p>
       <p>Nossa proposta é unir olhar atento ao design, informação clara e uma experiência digital fácil de explorar. Cada modelo comercial será apresentado com fotografias e detalhes correspondentes ao produto realmente disponível.</p>
      </div>
      <Link to="/loja" className="mt-12 inline-flex gap-5 items-center border-b border-black pb-3 text-xs uppercase tracking-[.16em] font-semibold">Explorar a seleção <ArrowRight size={18}/></Link>
    </div>
  </section>
  <section className="bg-[#56725b] text-white py-20 md:py-28 px-6 sm:px-10">
    <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-10">
      <div><p className="text-[11px] uppercase tracking-[.2em] text-white/75 mb-6">AGADE EYEWEAR</p>
       <h2 className="text-4xl sm:text-6xl lg:text-7xl max-w-3xl leading-[1.05] tracking-[-.04em]" style={{fontFamily:"var(--font-serif)"}}>Sua perspectiva merece espaço.</h2></div>
      <Link to="/loja" className="inline-flex items-center gap-3 border-b border-white pb-3 uppercase tracking-[.16em] text-xs font-semibold">Conheça os óculos <ArrowRight size={18}/></Link>
    </div>
  </section>
 </div>;
}