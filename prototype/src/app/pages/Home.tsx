import { Link } from "react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MoveUpRight, Sun } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const formatMoney=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
const image=(id:number,width:number)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
const typeLabel="text-[10px] sm:text-[11px] uppercase tracking-[.18em] font-semibold";
const display={fontFamily:"var(--font-serif)"};

function EditorialPhoto({id,alt,className="",position="center",priority=false}:{id:number;alt:string;className?:string;position?:string;priority?:boolean}){
 return <img src={image(id,priority?1600:1100)} alt={alt} loading={priority?"eager":"lazy"} fetchPriority={priority?"high":"auto"} decoding="async" style={{objectPosition:position}} className={`h-full w-full object-cover ${className}`}/>;
}
function TextLink({to,children,light=false}:{to:string;children:ReactNode;light?:boolean}){
 return <Link to={to} className={`group inline-flex items-center justify-between gap-7 min-h-12 rounded-full px-6 py-3 text-xs sm:text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${light?"bg-[#fff8ed] text-[#6d4045] hover:bg-white":"bg-[#a95e46] text-[#fff9ee] hover:bg-[#884735]"}`}>
  <span>{children}</span><ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"/>
 </Link>;
}
export default function Home(){
 const [catalog,setCatalog]=useState<StorefrontState>({status:"unconfigured",products:[]});
 useEffect(()=>{let active=true;loadStorefrontCatalog().then(data=>{if(active)setCatalog(data)});return()=>{active=false}},[]);
 const featured=catalog.status==="ready"?catalog.products.slice(0,4):[];
 return <div className="overflow-x-hidden bg-[#fffaf2] text-[#493630]">
  {/* A imagem conduz a página: tipografia e fotografia editorial com respiro, como nas referências. */}
  <section aria-labelledby="agade-hero" className="relative bg-[#f5eadb]">
   <div className="grid lg:grid-cols-[44%_56%] min-h-[690px] lg:min-h-[min(800px,calc(100svh-7rem))]">
    <div className="relative z-10 flex flex-col justify-between px-6 sm:px-12 lg:pl-[max(3rem,calc((100vw-1450px)/2))] pt-9 sm:pt-12 pb-12 sm:pb-16 min-h-[460px] lg:min-h-0">
     <div className="flex items-center gap-3">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#a95e46]"/>
      <span className={typeLabel+" text-[#886253]"}>AGADE · EDIÇÃO SOLAR</span>
     </div>
     <div className="relative mt-14 lg:mt-8">
      <p className={typeLabel+" text-[#a95e46] mb-6"}>O OLHAR É TODO SEU</p>
      <h1 id="agade-hero" className="text-[clamp(4.6rem,9vw,10.5rem)] tracking-[-.075em] leading-[.81] max-w-[800px]" style={display}>
       <span className="block">Sol.</span>
       <span className="block italic text-[#a95e46]">Corpo.</span>
       <span className="block">Olhar.</span>
      </h1>
      <p className="mt-9 max-w-[390px] text-base sm:text-lg leading-[1.55] text-[#65524b]">Óculos de sol pra usar muito. Estamos escolhendo os primeiros modelos com calma — olhando forma, conforto e aqueles detalhes que fazem diferença.</p>
      <div className="mt-8"><TextLink to="/loja">Conheça a seleção</TextLink></div>
     </div>
     <p className="mt-12 text-xs sm:text-sm text-[#846e62]">Estamos no começo. E queremos fazer isso com cuidado.</p>
    </div>
    <div className="relative min-h-[450px] sm:min-h-[540px] lg:min-h-0 overflow-hidden bg-[#60714e]">
     <EditorialPhoto id={9485735} priority alt="Fotografia editorial ilustrativa: pessoa com óculos de sol entre folhagens tropicais" position="center 35%"/>
     <div className="absolute inset-0 bg-gradient-to-t from-[#203521]/35 via-transparent to-transparent" aria-hidden="true"/>
     <div className="absolute top-5 right-5 sm:top-9 sm:right-9 bg-[#fffaf2]/95 text-[#785254] px-4 py-2 rounded-full text-xs tracking-wide font-medium shadow-sm">
      Referências da AGADE, por enquanto
     </div>
     <div className="absolute bottom-5 left-5 right-5 flex flex-wrap justify-between items-end gap-3 text-white">
      <p className={typeLabel+" max-w-[230px] drop-shadow-md"}>Fotografia ilustrativa, não é campanha oficial</p>
      <p className={typeLabel+" drop-shadow-md"}>Imagem de referência · Pexels</p>
     </div>
    </div>
   </div>
  </section>

  <section aria-label="Manifesto AGADE" className="bg-[#a95e46] text-[#fff8ee] py-4 sm:py-5 px-6">
   <div className="max-w-[1450px] mx-auto flex items-center justify-between gap-4">
    <span className={typeLabel+" leading-relaxed"}>UM POUCO DE SOL, UM MONTE DE JEITOS DE SER.</span>
    <span className="hidden sm:flex items-center gap-3"><Sun size={19} aria-hidden="true"/><span className={typeLabel}>AGADE 001</span></span>
   </div>
  </section>

  {/* Foto de moda, textura arquitetônica e produto: uma direção de arte, não faixas de cor aleatórias. */}
  <section aria-labelledby="editorial-title" className="max-w-[1500px] mx-auto px-5 sm:px-10 py-16 sm:py-24 lg:py-32">
   <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-16 items-center">
    <div className="max-w-[610px]">
     <p className={typeLabel+" text-[#a95e46] mb-5"}>01 / DO NOSSO JEITO</p>
     <h2 id="editorial-title" className="text-[clamp(3.2rem,6vw,6.6rem)] leading-[.98] tracking-[-.065em]" style={display}>Tem coisa que<br/><em className="text-[#785254]">é a nossa cara.</em></h2>
     <p className="text-[#6e5b52] mt-7 text-base leading-relaxed max-w-md">Uma roupa boa, uma rua bonita, uma luz que muda tudo. A gente gosta de prestar atenção nessas coisas. E acredita que um par de óculos pode fazer parte disso.</p>
     <div className="mt-9"><TextLink to="/sobre">Conheça a AGADE</TextLink></div>
    </div>
    <div className="grid grid-cols-[1.1fr_.8fr] gap-3 sm:gap-5 items-end">
     <figure className="relative aspect-[3/4] overflow-hidden rounded-[18px] sm:rounded-[28px] bg-[#af7a67]">
      <EditorialPhoto id={36409245} alt="Estudo de styling: modelo em roupa clara e óculos de sol sob luz quente, junto a parede de tijolos"/>
      <figcaption className="absolute bottom-3 left-3 right-3 text-[10px] text-white drop-shadow-md">Moda e textura · imagem ilustrativa</figcaption>
     </figure>
     <div className="pb-5 sm:pb-9">
      <figure className="aspect-[3/4.5] overflow-hidden rounded-[18px] sm:rounded-[28px] bg-[#bd8e6a]">
       <EditorialPhoto id={37428896} alt="Sombras de vegetação sobre parede terracota, referência de materialidade"/>
      </figure>
      <p className="mt-4 text-xs text-[#9b6553]">Uma das coisas que a gente ama: o sol batendo na parede.</p>
     </div>
    </div>
   </div>
  </section>

  <section aria-labelledby="collection-title" className="bg-[#f4ebdd] px-5 sm:px-10 py-16 sm:py-20 lg:py-24">
   <div className="max-w-[1450px] mx-auto">
    <div className="flex flex-col md:flex-row justify-between gap-7 md:items-end mb-9 sm:mb-11">
     <div><p className={typeLabel+" text-[#a95e46] mb-4"}>02 / A PRIMEIRA SELEÇÃO</p>
      <h2 id="collection-title" className="text-[clamp(3.5rem,6.5vw,7rem)] leading-[.96] tracking-[-.065em]" style={display}>Os primeiros <em>óculos.</em></h2></div>
     <Link to="/loja" className="group self-start md:self-end inline-flex gap-3 items-center min-h-12 text-sm border-b border-[#a95e46] text-[#785254] hover:text-[#a95e46]">Explorar óculos de sol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true"/></Link>
    </div>
    {featured.length>0?<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
     {featured.map(p=><Link to={`/produto/${encodeURIComponent(p.slug)}`} key={p.product_id} className="group">
      <div className="aspect-[3/4] bg-[#fffaf2] rounded-[18px] sm:rounded-3xl overflow-hidden flex items-center justify-center">
       {p.hero_image_url?<img src={p.hero_image_url} alt={`Óculos ${p.name}`} loading="lazy" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>:<span className="text-xs text-[#75655c]">Foto em preparação</span>}</div>
      <div className="flex flex-col sm:flex-row justify-between gap-1 sm:gap-3 pt-4 text-sm"><span className="font-semibold">{p.name}</span><span>{formatMoney(Math.min(...p.variants.map(v=>v.price_cents)))}</span></div>
     </Link>)}
    </div>:<div className="grid md:grid-cols-2 bg-[#fffaf2] rounded-[20px] sm:rounded-[30px] overflow-hidden">
     <div className="relative min-h-[350px] sm:min-h-[460px]">
      <EditorialPhoto id={10388460} alt="Estudo de fotografia de produto: óculos de sol sobre mesa com luz e sombras"/>
      <span className={typeLabel+" absolute bottom-4 left-4 text-white bg-black/50 backdrop-blur-sm rounded-full px-4 py-2"}>Foto ilustrativa · não é produto da AGADE</span>
     </div>
     <div className="flex flex-col justify-center items-start p-8 sm:p-12 lg:p-16">
      <span className={typeLabel+" text-[#a95e46] mb-5"}>CURADORIA EM ANDAMENTO</span>
      <h3 className="text-[clamp(2.7rem,4.5vw,5rem)] leading-[1.05] tracking-[-.05em]" style={display}>Ainda estamos escolhendo.</h3>
      <p className="text-[#6e5b52] leading-relaxed mt-6 mb-8 max-w-sm">A primeira seleção ainda não está pronta. Enquanto procuramos as armações certas, reunimos aqui imagens que mostram o clima que imaginamos para a AGADE. Os óculos da foto não estão à venda.</p>
      <TextLink to="/loja">Acompanhar a seleção</TextLink>
     </div>
    </div>}
   </div>
  </section>

  <section aria-labelledby="world-title" className="px-5 sm:px-10 py-16 sm:py-24 lg:py-32">
   <div className="max-w-[1450px] mx-auto">
    <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-8 sm:gap-12 lg:gap-20 items-center">
     <div className="lg:order-2 relative">
      <figure className="aspect-[4/4.4] sm:aspect-[5/4] lg:aspect-[5/4.3] overflow-hidden rounded-[22px] sm:rounded-[32px] bg-[#60724d]">
       <EditorialPhoto id={40688632} alt="Modelo usando óculos de sol entre folhas tropicais, estudo de campanha editorial"/>
      </figure>
      <div className="absolute -bottom-6 right-4 sm:right-8 bg-[#102e90] text-white rounded-full px-6 py-5 sm:px-8 sm:py-6 rotate-[-8deg] shadow-lg">
       <span className="block text-2xl sm:text-4xl leading-none" style={display}>Ver é</span>
       <span className="block text-xl sm:text-3xl italic leading-none" style={display}>sentir.</span>
      </div>
     </div>
     <div className="lg:order-1 pt-8 sm:pt-0 max-w-lg">
      <p className={typeLabel+" text-[#56725b] mb-5"}>03 / DE ONDE VEM A INSPIRAÇÃO</p>
      <h2 id="world-title" className="text-[clamp(3.2rem,6vw,6rem)] tracking-[-.06em] leading-[1.01]" style={display}>Tem sombra,<br/>tem sol,<br/><em className="text-[#a95e46]">tem vida lá fora.</em></h2>
      <p className="mt-7 mb-9 leading-relaxed text-[#6e5b52]">A referência pode vir de uma fachada antiga, de um jardim no meio da cidade ou de alguém passando na rua. É dessas cenas comuns que vem boa parte da nossa vontade de criar.</p>
      <Link to="/guia" className="inline-flex items-center gap-3 min-h-12 text-sm font-semibold border-b border-[#785254] text-[#785254]">Encontre seu formato <MoveUpRight size={17} aria-hidden="true"/></Link>
     </div>
    </div>
   </div>
  </section>

  <section className="bg-[#f2e3d1] px-5 sm:px-10 py-16 sm:py-20">
   <div className="max-w-[1450px] mx-auto grid md:grid-cols-[1.25fr_.75fr] gap-8 md:gap-16 items-center">
    <div>
     <p className={typeLabel+" text-[#9f5b47] mb-6"}>04 / MAIS QUE ESTILO</p>
     <h2 className="text-[clamp(3rem,6vw,6.5rem)] tracking-[-.06em] leading-[1]" style={display}>Seu estilo é livre.<br/><em>Informação também.</em></h2>
    </div>
    <div className="md:justify-self-end max-w-md">
     <p className="text-[#6e5b52] leading-relaxed mb-7">Medidas, ajuste, tipos de lente e proteção UV são assuntos sérios. Nossa curadoria combina expressão pessoal com informação técnica verificável.</p>
     <TextLink to="/guia">Guia de escolha</TextLink>
    </div>
   </div>
  </section>

  <section aria-label="Convite para conhecer a seleção" className="relative bg-[#785254] text-[#fffaf2] px-5 sm:px-10 py-16 sm:py-20 lg:py-24 overflow-hidden">
   <div className="absolute -right-12 -top-20 h-[270px] w-[270px] rounded-full border-[45px] border-[#fffaf2]/10" aria-hidden="true"/>
   <div className="relative max-w-[1450px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
    <div><p className={typeLabel+" text-[#f7dace] mb-5"}>AGADE / EM BREVE</p>
     <h2 className="text-[clamp(3.4rem,6.4vw,7rem)] leading-[.95] tracking-[-.06em]" style={display}>O sol é de todo mundo.<br/><em>O olhar é seu.</em></h2></div>
    <div className="self-start md:self-end"><TextLink to="/loja" light>Explore a AGADE</TextLink></div>
   </div>
  </section>

  <aside className="px-5 sm:px-10 py-4 bg-[#fffaf2] border-t border-[#e8d9c9] text-[#775d53] text-[11px] leading-relaxed">
   <p className="max-w-[1450px] mx-auto">Imagens editoriais ilustrativas licenciadas via Pexels, sem vínculo dos retratados com a AGADE. Os óculos da primeira seleção ainda serão definidos; as fotos não representam mercadorias disponíveis.</p>
  </aside>
 </div>;
}