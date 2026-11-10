import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
const root="/imagens/catalog/drop-01/";
const kicker="text-[10px] sm:text-xs uppercase tracking-[.21em] font-semibold";
export default function Home(){
 const [catalog,setCatalog]=useState<StorefrontState>({status:"unconfigured",products:[]});
 useEffect(()=>{let live=true;loadStorefrontCatalog().then(c=>{if(live)setCatalog(c)});return()=>{live=false}},[]);
 const featured=catalog.status==="ready"?catalog.products.slice(0,4):[];
 return <div className="bg-[#fffaf2] text-[#253128] overflow-hidden">
  <section className="relative min-h-[540px] sm:min-h-[660px] h-[min(850px,calc(100svh-7rem))] bg-[#4c422e] overflow-hidden">
   <img src={root+"05-horizonte.png"} fetchPriority="high" alt="Composição conceitual da identidade visual AGADE" className="absolute inset-0 w-full h-full object-cover object-center"/>
   <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#24372d]/80 via-[#24372d]/35 to-transparent"/>
   <div aria-hidden="true" className="absolute w-[600px] h-[600px] -left-[210px] -bottom-[300px] border-[95px] border-[#f7e9cc]/35 rounded-full rotate-12"/>
   <div className="relative h-full max-w-[1600px] mx-auto px-6 sm:px-12 flex flex-col justify-between text-white py-12 md:py-16">
    <div className="flex justify-between items-start gap-5">
     <p className={kicker+" text-[#ffdbac]"}>AGADE / EDITORIAL 001</p>
     <p className={kicker+" max-w-[170px] text-right"}>DO SOL PARA O SEU OLHAR</p>
    </div>
    <div className="max-w-[900px]">
     <p className={kicker+" mb-5 text-[#ffcfaa]"}>UMA NOVA FORMA DE ESTAR</p>
     <h1 className="font-normal text-[clamp(3.5rem,9.5vw,10.5rem)] leading-[.88] tracking-[-.065em]" style={{fontFamily:"var(--font-serif)"}}>Tem sol<br/>no nosso <em>jeito.</em></h1>
     <p className="text-base sm:text-xl leading-relaxed max-w-lg mt-8 mb-10 text-[#fff2df]">Óculos solares para quem carrega sua própria luz. Uma curadoria com personalidade, presença e vontade de viver.</p>
     <Link to="/loja" className="inline-flex gap-10 items-center justify-between bg-[#f8f1e4] text-[#24469a] px-6 sm:px-7 py-4 sm:py-5 rounded-xl min-h-12 uppercase text-xs tracking-[.17em] font-semibold hover:bg-white transition-colors">
      Explore a seleção <ArrowUpRight size={19} aria-hidden="true"/>
     </Link>
    </div>
    <div className="flex justify-between gap-4 text-[10px] tracking-[.15em] uppercase text-[#ffe0be]">
     <span>Imagem de estudo / Não representa produtos comerciais</span><span className="hidden sm:inline">01 / 03</span>
    </div>
   </div>
  </section>

  <div className="bg-[#24469a] text-[#fffaf2] overflow-hidden" aria-label="Manifesto AGADE">
   <div className="flex whitespace-nowrap gap-8 items-center px-5 py-4 uppercase text-sm sm:text-base font-medium tracking-[.14em]">
    <Star size={16} fill="currentColor" aria-hidden="true"/> O BRASIL É SOL <Star size={16} fill="currentColor" aria-hidden="true"/> A GENTE É MOVIMENTO <Star size={16} fill="currentColor" aria-hidden="true"/> SEU OLHAR TEM HISTÓRIA <Star size={16} fill="currentColor" aria-hidden="true"/> AGADE
   </div>
  </div>

  <section className="max-w-[1500px] mx-auto px-6 sm:px-12 py-20 md:py-28" aria-labelledby="selection-title">
   <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-7 mb-10">
    <div>
     <p className={kicker+" text-[#24469a] mb-4"}>01 / OBJETOS DO OLHAR</p>
     <h2 id="selection-title" className="text-[clamp(3.2rem,6vw,6.6rem)] leading-[.97] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Pra ver de <em>perto.</em></h2>
    </div>
    <p className="max-w-md leading-relaxed text-[#465a4d] lg:mb-2">Peças escolhidas para viver o cotidiano com estilo, da luz da manhã à última volta pela cidade.</p>
   </div>
   {featured.length>0?<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {featured.map(p=><Link to={`/produto/${encodeURIComponent(p.slug)}`} key={p.product_id} className="group">
     <div className="aspect-[3/4] bg-[#f4eadc] rounded-xl overflow-hidden flex items-center justify-center relative">
      {p.hero_image_url?<img src={p.hero_image_url} alt={`Óculos ${p.name}`} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>:<span className="text-xs text-[#765e4d]">Foto em preparação</span>}
     </div><div className="flex justify-between gap-3 pt-4 text-sm"><span className="font-semibold">{p.name}</span><span>{money(Math.min(...p.variants.map(v=>v.price_cents)))}</span></div>
    </Link>)}
   </div>:<div className="grid md:grid-cols-12 bg-[#f5eee1] rounded-2xl overflow-hidden min-h-[470px]">
    <div className="md:col-span-5 px-8 sm:px-12 py-16 flex flex-col justify-center items-start">
     <p className={kicker+" text-[#a64e39] mb-7"}>PRIMEIRA SELEÇÃO / EM CONSTRUÇÃO</p>
     <h3 className="text-4xl md:text-5xl leading-[1.05] tracking-[-.04em]" style={{fontFamily:"var(--font-serif)"}}>A forma certa ainda vai encontrar você.</h3>
     <p className="mt-7 max-w-sm leading-relaxed text-[#465a4d]">Estamos escolhendo os óculos da primeira edição. Por aqui, nada de estoque ou características inventadas.</p>
     <Link to="/loja" className="mt-9 inline-flex gap-4 items-center border-b border-[#24469a] pb-2 text-xs font-semibold uppercase tracking-[.15em]">Conheça a seleção <ArrowRight size={17}/></Link>
    </div>
    <div className="md:col-span-7 relative overflow-hidden bg-[#78917c] min-h-[380px]">
     <img src={root+"11-aura.png"} alt="Imagem do acervo conceitual de campanhas AGADE" className="absolute inset-0 w-full h-full object-cover" loading="lazy"/>
     <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#3e2016]/40 to-transparent"/>
     <span className="absolute bottom-6 right-6 text-white text-[10px] uppercase tracking-wider">Estudo visual</span>
    </div>
   </div>}
  </section>

  <section className="grid lg:grid-cols-2 bg-[#e6e9d9] text-[#24372d]">
   <div className="relative min-h-[430px] lg:min-h-[690px] overflow-hidden bg-[#494c34]">
    <img src={root+"12-marco-zero.png"} alt="Estudo de direção de arte para a identidade AGADE" loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true"/>
    <span className={kicker+" absolute bottom-7 left-8"}>EDITORIAL / IMAGEM CONCEITUAL</span>
   </div>
   <div className="px-8 sm:px-12 xl:px-24 py-16 lg:py-28 flex flex-col justify-center items-start relative overflow-hidden">
    <div aria-hidden="true" className="absolute -right-36 -top-36 border-[75px] border-[#9aae91]/20 rounded-full w-[420px] h-[420px]"/>
    <p className={kicker+" relative text-[#24469a] mb-8"}>02 / BRASIL EM TODOS OS SENTIDOS</p>
    <h2 className="relative text-[clamp(3rem,5.8vw,6.3rem)] leading-[1.04] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>O nosso <em>natural</em> é ter personalidade.</h2>
    <p className="relative mt-8 mb-10 leading-relaxed max-w-md text-[#41584a]">A AGADE celebra a expressão de cada pessoa. Nossa referência está na moda, nas cores, na cidade, na natureza e na maneira brasileira de viver o sol.</p>
    <Link to="/sobre" className="relative border-b border-[#24469a] pb-3 uppercase text-xs tracking-[.17em] flex items-center gap-4">Nossa história <ArrowUpRight size={18}/></Link>
   </div>
  </section>

  <section className="bg-[#f7f0e5] px-6 sm:px-12 py-20 md:py-28 text-[#24372d]">
   <div className="max-w-[1450px] mx-auto">
    <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-12">
     <div><p className={kicker+" mb-5"}>03 / GUIA DE OLHAR</p><h2 className="text-[clamp(3.3rem,6.5vw,7rem)] leading-[1.02] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Olho nos <em>detalhes.</em></h2></div>
     <Link to="/guia" className="inline-flex gap-3 items-center uppercase text-xs tracking-wider font-semibold border-b border-[#24469a] pb-3 self-start">Explore nosso guia <ArrowRight size={17}/></Link>
    </div>
    <div className="grid sm:grid-cols-3 gap-5">
     {[{n:"01",title:"A forma",text:"Uma armação que acompanha seu jeito de ocupar o mundo."},
       {n:"02",title:"O conforto",text:"Medidas, peso e ajuste importam tanto quanto o estilo."},
       {n:"03",title:"A lente",text:"Informação clara de polarização e proteção UV, quando verificável."}].map(x=><article key={x.n} className="bg-white/75 border border-[#d6dfcf] rounded-2xl px-7 py-9 min-h-[230px] flex flex-col justify-between">
      <p className={kicker+" text-[#24469a]"}>{x.n} / AGADE</p>
      <div><h3 className="text-3xl mb-3" style={{fontFamily:"var(--font-serif)"}}>{x.title}</h3><p className="text-sm leading-relaxed">{x.text}</p></div>
     </article>)}
    </div>
   </div>
  </section>

  <section className="bg-[#e4ecde] text-[#24372d] px-6 sm:px-12 py-20 md:py-24">
   <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div><p className={kicker+" mb-5 text-[#24469a]"}>AGADE / SUA PRÓXIMA DESCOBERTA</p>
     <h2 className="text-4xl sm:text-6xl lg:text-7xl tracking-[-.045em] leading-[1.05]" style={{fontFamily:"var(--font-serif)"}}>O sol é de todo mundo.<br/><em>O olhar é seu.</em></h2></div>
    <Link to="/loja" className="bg-[#24469a] text-white py-4 px-7 rounded-xl min-h-12 hover:bg-[#193879] transition-colors uppercase text-xs tracking-wider font-semibold inline-flex items-center gap-6 self-start md:self-end">Explorar a seleção <ArrowDownRight size={19}/></Link>
   </div>
  </section>
 </div>;
}