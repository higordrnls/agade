import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Check, Info, ShoppingBag } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontProduct, type StorefrontState } from "../data/storefrontCatalog";
import { useCart } from "../context/CartContext";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);

function TechnicalItem({label,value}:{label:string,value:string}){
 return <div className="py-4 border-b border-black/10 flex justify-between items-start gap-5 text-sm">
   <dt className="text-[#666]">{label}</dt><dd className="text-right max-w-[65%]">{value}</dd>
 </div>;
}
export default function Product(){
 const {slug}=useParams();
 const cart=useCart();
 const [data,setData]=useState<StorefrontState>({status:"unconfigured",products:[]});
 const [loading,setLoading]=useState(true);
 const [selected,setSelected]=useState<string>("");
 useEffect(()=>{let active=true;loadStorefrontCatalog().then(r=>{if(active){setData(r);setLoading(false)}});return()=>{active=false}},[]);
 const product:StorefrontProduct|undefined=data.products.find(p=>p.slug===slug);
 const variant=product?.variants.find(v=>v.variant_id===selected)??product?.variants[0];
 return <div className="bg-white text-[#171717] min-h-[65vh]">
  <div className="max-w-[1480px] mx-auto px-6 sm:px-10 py-7">
   <nav aria-label="Caminho de navegação" className="flex gap-2 items-center text-[11px] uppercase tracking-[.12em] text-[#666]">
    <Link to="/" className="hover:underline">Início</Link><span>/</span><Link to="/loja" className="hover:underline">Óculos de sol</Link>
    {product&&<><span>/</span><span className="text-black">{product.name}</span></>}
   </nav>
  </div>
  {loading && <p className="max-w-[1480px] mx-auto px-6 sm:px-10 py-24" role="status">Carregando detalhes do modelo…</p>}
  {!loading&&!product&&<div className="max-w-[1480px] mx-auto px-6 sm:px-10 py-24">
    <p className="text-xs uppercase tracking-[.2em] text-[#24469a] mb-5">AGADE / SELEÇÃO</p>
    <h1 className="text-4xl md:text-6xl" style={{fontFamily:"var(--font-serif)"}}>{data.status==="error"?"Seleção indisponível.":"Este modelo não está disponível."}</h1>
    <p className="text-[#666] mt-6">Somente modelos comerciais publicados e disponíveis podem ser consultados nesta página.</p>
    <Link to="/loja" className="mt-10 inline-flex items-center gap-3 border-b border-black pb-2">Voltar à seleção <ArrowLeft size={18}/></Link>
   </div>}
  {!loading&&product&&variant&&<div className="max-w-[1480px] mx-auto px-6 sm:px-10 pb-24 grid lg:grid-cols-2 gap-10 lg:gap-20">
   <div className="lg:sticky lg:top-36 lg:self-start">
    <div className="relative aspect-[4/5] bg-[#f3f3f3] flex items-center justify-center overflow-hidden">
     {product.hero_image_url?<img src={product.hero_image_url} alt={`Óculos ${product.name}, fotografia do produto`} className="w-full h-full object-contain" />:
     <div className="text-center text-[#777] text-sm">Fotografia do produto em preparação</div>}
     {product.collection_name&&<span className="absolute left-5 top-5 text-[10px] uppercase tracking-[.2em] bg-white px-4 py-2">{product.collection_name}</span>}
    </div>
    <p className="text-[#777] text-xs mt-3">As informações técnicas correspondem à variação selecionada.</p>
   </div>
   <div className="lg:py-5">
    <p className="text-xs uppercase tracking-[.2em] text-[#102e90] mb-5">AGADE EYEWEAR · ÓCULOS DE SOL</p>
    <h1 className="font-normal text-[clamp(3rem,5.5vw,5.8rem)] tracking-[-.045em] leading-tight" style={{fontFamily:"var(--font-serif)"}}>{product.name}</h1>
    <p className="text-2xl mt-5 font-medium">{money(variant.price_cents)}</p>
    {product.editorial_description&&<p className="mt-7 text-[#555] max-w-xl leading-relaxed">{product.editorial_description}</p>}
    <fieldset className="mt-10">
     <legend className="font-semibold text-sm mb-4">Escolha a variação — {variant.color_name}</legend>
     <div className="flex flex-wrap gap-3">
      {product.variants.map(v=><button type="button" key={v.variant_id} onClick={()=>setSelected(v.variant_id)}
       aria-pressed={variant.variant_id===v.variant_id}
       className={`border px-4 py-3 text-xs uppercase tracking-wider min-h-12 ${variant.variant_id===v.variant_id?"border-[#a54e39] bg-[#f8e6d9]":"border-black/20 hover:border-black"}`}>
       {v.color_name}
      </button>)}
     </div>
    </fieldset>
    <div className="mt-8 border-y border-black/15 py-5 flex items-center gap-3 text-sm"><Check size={18} className="text-[#102e90]"/><span>Variação disponível na seleção</span></div>
    <button type="button" onClick={()=>cart.add({productId:product.product_id,variantId:variant.variant_id,sku:variant.sku,name:product.name,color:variant.color_name,priceCents:variant.price_cents,imageUrl:product.hero_image_url,quantity:1,stockSnapshot:variant.sellable_stock})}
      className="mt-8 w-full flex items-center justify-center gap-3 bg-[#24469a] hover:bg-[#0b216b] text-white py-4 px-6 text-xs uppercase tracking-[.16em] font-semibold">
      <ShoppingBag size={18}/> Guardar na sacola de seleção
    </button>
    <p className="text-xs text-[#666] mt-3">A sacola é uma lista local de interesse. Não cria pedidos, reservas nem cobranças.</p>
    <div className="mt-8 bg-[#f6e7da] p-6">
     <p className="uppercase text-xs tracking-[.17em] font-semibold">Compra online em preparação · frete por conta do cliente</p>
     <p className="text-sm text-[#555] leading-relaxed mt-3">Estamos concluindo a integração de pagamentos e entrega. O frete será calculado e pago pelo cliente. Pretendemos oferecer parcelamento, com condições exibidas antes da compra.</p>
     <Link to="/ajuda" className="inline-flex items-center gap-2 mt-5 text-xs uppercase tracking-[.13em] underline underline-offset-4">Trocas, devoluções e direitos <ArrowRight size={15}/></Link>
    </div>
    <div className="mt-12">
     <h2 className="text-2xl font-normal mb-6" style={{fontFamily:"var(--font-serif)"}}>Detalhes do modelo</h2>
     <dl>
      <TechnicalItem label="Referência" value={variant.sku}/>
      <TechnicalItem label="Cor" value={variant.color_name}/>
      <TechnicalItem label="Tipo de lente" value={variant.lens_type}/>
      {variant.size_description&&<TechnicalItem label="Medidas" value={variant.size_description}/>}
      {variant.weight_grams!=null&&<TechnicalItem label="Peso" value={`${variant.weight_grams} g`}/>}
      {variant.uv_claim&&<TechnicalItem label="Informação de proteção UV" value={variant.uv_claim}/>}
      {variant.polarized_claim!=null&&<TechnicalItem label="Lente polarizada" value={variant.polarized_claim?"Sim":"Não"}/>}
     </dl>
     {product.technical_description&&<p className="text-sm leading-relaxed text-[#555] mt-6">{product.technical_description}</p>}
     <p className="flex gap-2 items-start mt-7 text-xs text-[#666] leading-relaxed"><Info size={16} className="shrink-0"/>Características e alegações técnicas são apresentadas apenas quando há informações específicas registradas para a variação. Não exibimos selos de certificação sem documentação verificável.</p>
    </div>
    <Link to="/loja" className="inline-flex items-center gap-2 mt-10 border-b border-black pb-2 text-xs tracking-[.15em] uppercase">Voltar à coleção <ArrowRight size={16}/></Link>
   </div>
  </div>}
 </div>;
}