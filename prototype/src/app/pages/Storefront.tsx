import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);

export default function Storefront(){
 const [state,setState]=useState<StorefrontState>({status:"unconfigured",products:[]});
 const [loading,setLoading]=useState(true);
 const [params,setParams]=useSearchParams();
 const search=params.get("busca")??"";
 const [sort,setSort]=useState("featured");
 useEffect(()=>{let active=true;loadStorefrontCatalog().then(data=>{if(active){setState(data);setLoading(false)}});return()=>{active=false}},[]);
 const products=useMemo(()=>{
  const q=search.trim().toLocaleLowerCase("pt-BR");
  const entries=state.products.filter(p=>!q||[p.name,p.collection_name??"",p.editorial_description,...p.variants.map(v=>v.color_name)].some(t=>t.toLocaleLowerCase("pt-BR").includes(q)));
  const min=(p:typeof entries[number])=>Math.min(...p.variants.map(v=>v.price_cents));
  if(sort==="lowest")entries.sort((a,b)=>min(a)-min(b));
  if(sort==="highest")entries.sort((a,b)=>min(b)-min(a));
  if(sort==="name")entries.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));
  return entries;
 },[search,sort,state.products]);
 return <div className="min-h-screen bg-[#fffaf2] text-[#24372d]">
  <header className="bg-[#f0dfcf] px-6 sm:px-10 pt-16 pb-20">
   <div className="max-w-[1440px] mx-auto">
    <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#a95e46] mb-6">AGADE / EDIÇÃO 01</p>
    <h1 className="text-[clamp(3.7rem,8vw,8rem)] leading-[.95] tracking-[-.055em] font-normal" style={{fontFamily:"var(--font-serif)"}}>Óculos para sentir o sol.</h1>
    <p className="mt-7 max-w-2xl text-base sm:text-lg text-[#41584a] leading-relaxed">Curadoria solar com personalidade. Formas, cores e histórias para quem vive de olhar aberto.</p>
   </div>
  </header>
  <section className="max-w-[1500px] mx-auto px-6 sm:px-10 py-12 md:py-20" aria-busy={loading}>
   <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-5 border-b border-black/20 mb-9">
    <div><p className="uppercase text-[11px] tracking-[.17em] text-[#666] mb-2">A SELEÇÃO</p>
     <h2 className="text-2xl sm:text-3xl font-normal" style={{fontFamily:"var(--font-serif)"}}>Encontre sua forma.</h2></div>
    <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
     <form onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const v=String(data.get("busca")??"").trim();setParams(v?{busca:v}:{})}}
       className="flex items-center gap-2 border-b border-black/30 pb-2">
      <Search size={17} aria-hidden="true"/>
      <label htmlFor="catalog-search" className="sr-only">Buscar modelo ou cor</label>
      <input id="catalog-search" type="search" name="busca" defaultValue={search} key={search}
        className="text-sm w-[150px] sm:w-[210px] focus:outline-none" placeholder="Buscar modelo ou cor"/>
      <button type="submit" className="sr-only focus:not-sr-only">Buscar</button>
     </form>
     <div className="flex gap-2 items-center">
      <SlidersHorizontal size={16} aria-hidden="true"/>
      <label htmlFor="catalog-sort" className="sr-only">Ordenar seleção</label>
      <select id="catalog-sort" value={sort} onChange={e=>setSort(e.target.value)} className="bg-white text-sm focus-visible:outline-2 py-2">
       <option value="featured">Nossa seleção</option><option value="lowest">Menor preço</option><option value="highest">Maior preço</option><option value="name">Nome A–Z</option>
      </select>
     </div>
    </div>
   </div>
   {loading && <p role="status" className="py-14 text-[#666]">Carregando a seleção…</p>}
   {!loading && state.status==="error" && <div role="alert" className="py-20 border-b border-black/10">
    <h3 className="text-3xl mb-3" style={{fontFamily:"var(--font-serif)"}}>Não foi possível carregar a seleção.</h3>
    <p>Por favor, tente novamente mais tarde.</p>
   </div>}
   {!loading && (state.status==="unconfigured"||(state.status==="ready"&&state.products.length===0)) && <div className="grid md:grid-cols-2 bg-[#f2f3f7] min-h-[400px]">
    <div className="p-9 sm:p-14 flex flex-col justify-center items-start">
     <p className="text-[#102e90] text-[11px] tracking-[.18em] uppercase mb-5">EM BREVE</p>
     <h3 className="text-3xl sm:text-5xl leading-tight" style={{fontFamily:"var(--font-serif)"}}>A primeira seleção está chegando.</h3>
     <p className="text-[#555] mt-6 leading-relaxed">Os modelos serão apresentados aqui assim que imagens, características e disponibilidade estiverem confirmadas.</p>
     <Link to="/" className="inline-flex items-center gap-3 mt-8 text-xs tracking-[.15em] uppercase font-medium border-b border-black pb-2">Voltar à página inicial <ArrowRight size={16}/></Link>
    </div>
    <div className="relative min-h-[350px] overflow-hidden bg-[#cb8063]">
     <img src="/imagens/catalog/drop-01/11-aura.png" loading="lazy" alt="Imagem de estudo da direção visual AGADE" className="absolute inset-0 w-full h-full object-cover"/>
     <span className="absolute bottom-5 right-5 text-white bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[.15em]">Estudo visual</span>
    </div>
   </div>}
   {!loading && state.status==="ready" && state.products.length>0 && products.length===0 && <p role="status" className="py-16 text-[#555]">Nenhum modelo encontrado para “{search}”. Tente outra busca.</p>}
   {!loading && state.status==="ready" && products.length>0 && <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-7 gap-y-14">
    {products.map(p=><article key={p.product_id} className="group">
     <Link to={`/produto/${encodeURIComponent(p.slug)}`} aria-label={`Ver detalhes de ${p.name}`} className="relative block aspect-[3/4] bg-[#f4eddf] overflow-hidden flex items-center justify-center">
      {p.hero_image_url?<img src={p.hero_image_url} alt={`Óculos ${p.name}`} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"/>:
        <span className="text-[#777] text-xs">Fotografia em preparação</span>}
      {p.collection_name&&<span className="absolute top-4 left-4 text-[10px] tracking-[.12em] uppercase bg-white px-3 py-2">{p.collection_name}</span>}
     </Link>
     <div className="flex justify-between items-start gap-3 pt-4">
      <div><h3 className="font-semibold text-sm sm:text-base"><Link to={`/produto/${encodeURIComponent(p.slug)}`} className="hover:underline underline-offset-4">{p.name}</Link></h3><p className="text-xs text-[#666] mt-1">{p.variants.map(v=>v.color_name).join(" · ")}</p></div>
      <span className="text-sm font-medium whitespace-nowrap">{money(Math.min(...p.variants.map(v=>v.price_cents)))}</span>
     </div>
     {p.editorial_description&&<p className="text-sm text-[#555] leading-relaxed mt-3">{p.editorial_description}</p>}
     <Link to={`/produto/${encodeURIComponent(p.slug)}`} className="mt-4 inline-flex text-[11px] uppercase tracking-[.12em] text-[#102e90] border-b border-[#a54f39] pb-1">Ver detalhes e variações <ArrowRight size={14} className="ml-2"/></Link>
    </article>)}
   </div>}
  </section>
 </div>;
}