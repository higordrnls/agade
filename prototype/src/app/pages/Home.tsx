import { Link } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
const photo=(id:number,w:number)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const serif={fontFamily:"var(--font-serif)"};
function Action({to,children,outline=false}:{to:string;children:ReactNode;outline?:boolean}){
 return <Link to={to} className={`inline-flex min-h-12 items-center justify-between gap-8 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${outline?"border border-[var(--agade-accent)] text-[var(--agade-ink)] hover:bg-[var(--agade-soft)]":"bg-[var(--agade-accent)] text-white hover:bg-[var(--agade-deep)]"}`}>
  {children}<ArrowUpRight size={18} aria-hidden="true"/>
 </Link>;
}
export default function Home(){
 // Direção única: Brasil cotidiano, luz natural e hierarquia editorial.
 // Cores brasileiras como referência cultural, não como garantia de conversão.
 const theme={
  "--agade-page":"#FFFFFF",
  "--agade-ink":"#173F70",
  "--agade-muted":"#3F5667",
  "--agade-accent":"#B94737",
  "--agade-soft":"#FFFFFF",
  "--agade-feature":"#E4F2F8",
  "--agade-highlight":"#F1B844",
  "--agade-leaf":"#287A58",
  "--agade-deep":"#17699D",
  "--agade-caption":"#476174",
 };
 const [catalog,setCatalog]=useState<StorefrontState>({status:"unconfigured",products:[]});
 useEffect(()=>{let alive=true;loadStorefrontCatalog().then(data=>{if(alive)setCatalog(data)});return()=>{alive=false}},[]);
 const featured=catalog.status==="ready"?catalog.products.slice(0,4):[];
 return <div style={theme as React.CSSProperties} className="overflow-x-hidden bg-[var(--agade-page)] text-[var(--agade-ink)]">
  {/* No celular, o produto no rosto aparece ANTES do texto — e dentro da primeira dobra. */}
  <section className="bg-white lg:grid lg:grid-cols-[47%_53%]" aria-labelledby="home-hero">
   <div className="relative min-h-[320px] h-[47svh] max-h-[540px] sm:h-[55svh] lg:h-auto lg:min-h-[650px] lg:order-2 bg-[var(--agade-deep)] overflow-hidden">
    <img src={photo(9485735,1600)} alt="Referência editorial: pessoa usando óculos de sol entre folhas tropicais" fetchPriority="high" loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[center_35%]"/>
    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"/>
    <p className="absolute left-5 bottom-4 sm:left-9 text-white text-[10px] tracking-wide leading-relaxed max-w-[270px]">Fotografia de referência · os óculos retratados não são produtos da AGADE</p>
   </div>
   <div className="flex flex-col justify-center lg:order-1 px-6 sm:px-12 lg:pl-[max(3rem,calc((100vw-1450px)/2))] py-10 sm:py-16 lg:py-24">
    <p className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--agade-deep)] mb-4 sm:mb-7">AGADE / ÓCULOS DE SOL</p>
    <h1 id="home-hero" className="text-[clamp(3.3rem,7.1vw,7.3rem)] leading-[.94] tracking-[-.065em] max-w-[680px]" style={serif}>Óculos de sol.<br/><span className="text-[var(--agade-deep)]">Do seu jeito.</span></h1>
    <p className="mt-5 sm:mt-8 text-[15px] sm:text-lg text-[var(--agade-muted)] leading-relaxed max-w-md">Estamos preparando a primeira seleção da AGADE. Armações para experimentar, sair de casa e usar de verdade.</p>
    <div className="mt-7 sm:mt-9"><Link to="/loja" className="inline-flex min-h-12 items-center justify-between gap-8 rounded-full px-6 py-3 text-sm font-semibold bg-[var(--agade-deep)] text-white hover:bg-[var(--agade-ink)] transition-colors">Conhecer a seleção <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
    <p className="mt-8 lg:mt-20 text-xs text-[var(--agade-muted)]">Uma curadoria independente, ainda em construção.</p>
   </div>
  </section>

  <div aria-hidden="true" className="h-1.5 w-full bg-[var(--agade-highlight)]"/>
  <section aria-labelledby="home-inspiration" className="max-w-[1450px] mx-auto px-5 sm:px-10 py-16 sm:py-24 lg:py-28">
   <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-10 lg:gap-20 items-center">
    <div className="grid grid-cols-[1.15fr_.8fr] gap-3 sm:gap-5 items-end">
     <figure className="min-w-0">
      <div className="aspect-[3/4] overflow-hidden rounded-[16px] sm:rounded-[26px] bg-[var(--agade-highlight)]">
       <img src={photo(36409245,1100)} alt="Referência de styling: modelo de óculos de sol junto a parede com textura" loading="lazy" decoding="async" className="w-full h-full object-cover"/>
      </div>
      <figcaption className="mt-3 text-xs text-[var(--agade-caption)]">Roupa, textura, luz.</figcaption>
     </figure>
     <figure className="min-w-0 pb-5 sm:pb-12">
      <div className="aspect-[3/4] overflow-hidden rounded-[16px] sm:rounded-[26px] bg-[var(--agade-feature)]">
       <img src={photo(37428896,850)} alt="Sombras de plantas sobre parede terracota" loading="lazy" decoding="async" className="w-full h-full object-cover"/>
      </div>
      <figcaption className="mt-3 text-xs text-[var(--agade-caption)]">Uma sombra no fim da tarde.</figcaption>
     </figure>
    </div>
    <div className="lg:pl-4">
     <p className="text-xs font-semibold uppercase tracking-[.14em] text-[var(--agade-leaf)] mb-5">De onde vem a inspiração</p>
     <h2 id="home-inspiration" className="text-[clamp(2.5rem,4.5vw,5.1rem)] leading-[1.02] tracking-[-.05em]" style={serif}>A gente presta atenção nas coisas que encontra por aí.</h2>
     <p className="text-[var(--agade-muted)] leading-relaxed mt-6 max-w-md">Uma fachada bonita, o sol entrando pela janela, alguém passando na rua com um óculos que combina perfeitamente com a pessoa. São essas imagens que ficam na cabeça.</p>
     <Link to="/sobre" className="mt-8 inline-flex min-h-12 items-center gap-3 text-sm font-medium border-b border-[var(--agade-accent)] text-[var(--agade-ink)]">Mais sobre a AGADE <ArrowRight size={17}/></Link>
    </div>
   </div>
  </section>

  <section aria-labelledby="home-products" className="bg-[var(--agade-feature)] px-5 sm:px-10 py-14 sm:py-20 lg:py-24">
   <div className="max-w-[1450px] mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-9">
     <div><p className="text-xs tracking-[.14em] uppercase text-[var(--agade-accent)] mb-4 font-semibold">Primeira edição</p>
      <h2 id="home-products" className="text-[clamp(2.9rem,5vw,5.5rem)] leading-[1] tracking-[-.055em]" style={serif}>Os óculos.</h2></div>
     <Link to="/loja" className="inline-flex items-center gap-3 min-h-12 self-start text-sm text-[var(--agade-ink)] border-b border-[var(--agade-accent)]">Ver seleção <ArrowRight size={17}/></Link>
    </div>
    {featured.length>0?<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
     {featured.map(p=><Link to={`/produto/${encodeURIComponent(p.slug)}`} key={p.product_id} className="group">
      <div className="aspect-[3/4] bg-[var(--agade-page)] rounded-2xl overflow-hidden flex items-center justify-center">
       {p.hero_image_url?<img src={p.hero_image_url} alt={`Óculos ${p.name}`} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>:<span className="text-xs text-[var(--agade-muted)]">Foto em preparação</span>}
      </div><div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-3 pt-4 text-sm"><span className="font-semibold">{p.name}</span><span>{money(Math.min(...p.variants.map(v=>v.price_cents)))}</span></div>
     </Link>)}
    </div>:<div className="grid md:grid-cols-[1fr_1.05fr] bg-[var(--agade-page)] rounded-[20px] sm:rounded-[28px] overflow-hidden">
     <div className="relative min-h-[280px] sm:min-h-[380px] md:min-h-[470px]">
      <img src={photo(10388460,1250)} loading="lazy" decoding="async" alt="Fotografia ilustrativa de óculos sobre uma mesa iluminada" className="absolute inset-0 w-full h-full object-cover"/>
     </div>
     <div className="flex flex-col items-start justify-center p-7 sm:p-12 lg:p-16">
      <h3 className="text-[clamp(2.2rem,3.7vw,4.2rem)] tracking-[-.05em] leading-[1.05]" style={serif}>Estamos escolhendo as primeiras armações.</h3>
      <p className="text-[var(--agade-muted)] leading-relaxed mt-6 mb-8 max-w-sm">Por enquanto, esta foto é só uma referência. Os modelos e preços reais vão aparecer aqui quando a seleção estiver pronta.</p>
      <Action to="/loja">Acompanhar a seleção</Action>
     </div>
    </div>}
   </div>
  </section>

  <section className="max-w-[1450px] mx-auto px-5 sm:px-10 py-16 sm:py-24 lg:py-28" aria-labelledby="home-guide">
   <div className="grid md:grid-cols-[1fr_.8fr] gap-8 md:gap-16 items-center">
    <div>
     <p className="text-xs uppercase tracking-[.14em] text-[var(--agade-leaf)] font-semibold mb-4">Antes de escolher</p>
     <h2 id="home-guide" className="text-[clamp(2.8rem,5vw,5.8rem)] leading-[1.02] tracking-[-.05em]" style={serif}>Bonito no rosto.<br/>Bom de usar.</h2>
    </div>
    <div className="max-w-lg md:justify-self-end">
     <p className="text-[var(--agade-muted)] leading-relaxed mb-8">Medidas da armação, caimento e tipo de lente: reunimos informações para ajudar a comparar os modelos. Os dados de proteção UV serão informados individualmente, quando verificados.</p>
     <Action to="/guia" outline>Guia de escolha</Action>
    </div>
   </div>
  </section>

  <section className="bg-[var(--agade-deep)] text-white px-5 sm:px-10 py-14 sm:py-20">
   <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-7">
    <div><p className="text-xs uppercase tracking-[.14em] text-white/90 font-semibold mb-3">AGADE / EM BREVE</p>
     <h2 className="text-[clamp(2.8rem,5vw,5.7rem)] leading-[1] tracking-[-.05em]" style={serif}>A seleção está quase tomando forma.</h2></div>
    <div className="self-start md:self-end"><Link to="/loja" className="inline-flex min-h-12 items-center justify-between gap-8 rounded-full px-6 py-3 text-sm font-semibold bg-white text-[var(--agade-deep)] hover:bg-[var(--agade-soft)] transition-colors">Conheça a AGADE <ArrowUpRight size={18} aria-hidden="true"/></Link></div>
   </div>
  </section>

  <aside className="bg-[var(--agade-page)] px-5 sm:px-10 py-4 text-[11px] text-[var(--agade-muted)] leading-relaxed">
   <p className="max-w-[1450px] mx-auto">Imagens ilustrativas licenciadas via Pexels. Pessoas retratadas não têm vínculo com a AGADE e os óculos mostrados não representam itens disponíveis para compra.</p>
  </aside>
 </div>;
}