import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
const imgRoot="/imagens/catalog/drop-01/";
const eyebrow="text-[10px] sm:text-[11px] uppercase tracking-[.22em] font-medium";

export default function Home(){
 const [catalog,setCatalog]=useState<StorefrontState>({status:"unconfigured",products:[]});
 useEffect(()=>{let mounted=true;loadStorefrontCatalog().then(x=>{if(mounted)setCatalog(x)});return()=>{mounted=false}},[]);
 const featured=catalog.status==="ready"?catalog.products.slice(0,4):[];
 return <div className="bg-white text-[#171717]">
  <section className="relative min-h-[min(760px,calc(100svh-7rem))] h-[75svh] max-h-[940px] overflow-hidden bg-[#202524]">
   <img src={imgRoot+"05-horizonte.png"} alt="Composição visual editorial da AGADE, apresentada como estudo de campanha"
     className="absolute inset-0 w-full h-full object-cover object-center" fetchPriority="high"/>
   <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/5"/>
   <div className="relative h-full max-w-[1600px] mx-auto px-6 sm:px-10 flex flex-col justify-center items-start text-white">
    <p className={eyebrow+" mb-7 text-white/80"}>AGADE EYEWEAR · PRIMEIRA EDIÇÃO</p>
    <h1 className="font-normal text-[clamp(3.9rem,8vw,8.8rem)] leading-[.98] tracking-[-.045em] max-w-[900px]" style={{fontFamily:"var(--font-serif)"}}>
     Vista o seu<br/>ponto de vista.
    </h1>
    <p className="text-base sm:text-lg leading-relaxed max-w-[460px] mt-7 mb-9 text-white/90">
      Óculos solares selecionados para quem encontra estilo no próprio olhar.
    </p>
    <Link to="/loja" className="inline-flex items-center justify-between gap-12 min-w-[230px] bg-white text-black px-6 py-[17px] text-xs tracking-[.17em] font-semibold uppercase hover:bg-[#102e90] hover:text-white transition-colors">
      Conheça a seleção <ArrowUpRight size={18} aria-hidden="true"/>
    </Link>
   </div>
   <p className="absolute bottom-5 right-6 sm:right-10 text-[10px] tracking-[.12em] uppercase text-white/75">Imagem de estudo visual · Produtos em preparação</p>
  </section>

  <section className="border-b border-black/10 px-6 sm:px-10 py-5" aria-label="Características da AGADE">
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-[11px] uppercase tracking-[.17em] text-[#444]">
     <span>Curadoria independente</span><span>Olhar autoral</span><span>De Uberlândia para o Brasil</span>
    </div>
  </section>

  <section className="max-w-[1500px] mx-auto px-6 sm:px-10 py-20 md:py-28" aria-labelledby="home-selection-title">
   <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
    <div><p className={eyebrow+" text-[#102e90] mb-4"}>A NOSSA SELEÇÃO</p>
     <h2 id="home-selection-title" className="font-normal text-4xl md:text-6xl tracking-[-.04em]" style={{fontFamily:"var(--font-serif)"}}>Peças para um novo olhar.</h2>
    </div>
    <Link to="/loja" className="text-[11px] uppercase tracking-[.15em] font-semibold border-b border-black pb-2 inline-flex gap-3 items-center self-start sm:self-auto">
      Ver todos os óculos <ArrowRight size={17} aria-hidden="true"/>
    </Link>
   </div>
   {featured.length>0 ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
    {featured.map(p=><Link to={`/loja?busca=${encodeURIComponent(p.name)}`} className="group" key={p.product_id}>
     <div className="aspect-[3/4] bg-[#f3f3f1] overflow-hidden flex justify-center items-center">
      {p.hero_image_url ? <img src={p.hero_image_url} alt={`Óculos ${p.name}`} className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-500" loading="lazy"/> :
       <span className="text-xs text-[#888]">Imagem em preparação</span>}
     </div>
     <div className="pt-4 flex justify-between gap-2 text-sm">
      <div><h3 className="font-medium">{p.name}</h3><p className="text-[#777] text-xs mt-1">{p.variants.length} {p.variants.length===1?"variação":"variações"}</p></div>
      <span className="shrink-0">{money(Math.min(...p.variants.map(v=>v.price_cents)))}</span>
     </div>
    </Link>)}
   </div> : <div className="grid md:grid-cols-2 gap-0 bg-[#f2f3f7]">
    <div className="flex flex-col items-start justify-center px-8 sm:px-12 py-14 md:py-20">
     <span className={eyebrow+" text-[#102e90] mb-5"}>EM BREVE / EDIÇÃO 01</span>
     <h3 className="text-3xl sm:text-4xl font-normal leading-tight" style={{fontFamily:"var(--font-serif)"}}>Estamos escolhendo<br/>cada detalhe.</h3>
     <p className="leading-relaxed text-[#555] max-w-md mt-5 mb-8">A primeira curadoria de óculos solares está sendo preparada. Os modelos só aparecerão aqui com informações e disponibilidade verificadas.</p>
     <Link to="/loja" className="inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[.15em] border-b border-black pb-2">Explorar a seleção <ArrowRight size={17}/></Link>
    </div>
    <div className="relative min-h-[330px] md:min-h-[440px] bg-[#c1c5ce] overflow-hidden">
     <img src={imgRoot+"11-aura.png"} alt="Estudo visual da identidade AGADE" loading="lazy" className="w-full h-full absolute inset-0 object-cover"/>
     <span className="absolute bottom-4 right-5 text-white text-[10px] uppercase tracking-wider bg-black/45 px-2 py-1">Estudo visual</span>
    </div>
   </div>}
  </section>

  <section className="grid md:grid-cols-2 bg-[#102e90] text-white">
    <div className="relative min-h-[370px] md:min-h-[600px] bg-[#1c2853]">
     <img src={imgRoot+"12-marco-zero.png"} loading="lazy" alt="Estudo visual AGADE" className="absolute inset-0 w-full h-full object-cover"/>
     <span className="absolute left-6 bottom-5 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-widest">Estudo de campanha</span>
    </div>
    <div className="flex flex-col justify-center items-start px-8 sm:px-12 lg:px-20 py-16 md:py-24">
     <span className={eyebrow+" text-white/65 mb-7"}>SOBRE A AGADE</span>
     <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-[-.04em] font-normal max-w-xl" style={{fontFamily:"var(--font-serif)"}}>Estilo é uma forma de expressão.</h2>
     <p className="mt-8 mb-10 text-white/85 max-w-md text-base leading-relaxed">A AGADE nasce em Uberlândia com uma proposta simples: transformar a escolha dos óculos em uma experiência de descoberta, identidade e atitude.</p>
     <Link to="/sobre" className="inline-flex items-center gap-3 border-b border-white pb-2 text-xs tracking-[.16em] uppercase font-semibold">Conheça a AGADE <ArrowRight size={18}/></Link>
    </div>
  </section>
  <section className="py-16 px-6 sm:px-10 bg-[#f6f6f5] text-center">
   <p className={eyebrow+" text-[#102e90] mb-4"}>AGADE EYEWEAR</p>
   <h2 className="text-3xl sm:text-5xl font-normal tracking-tight" style={{fontFamily:"var(--font-serif)"}}>Seu olhar. Sua escolha.</h2>
   <Link to="/loja" className="mt-7 inline-flex items-center gap-3 text-sm font-medium underline underline-offset-8">Conheça a seleção <ArrowRight size={18}/></Link>
  </section>
 </div>;
}