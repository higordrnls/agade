import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
export default function CartDrawer(){
 const {items,open,setOpen,total,remove,changeQuantity,clear}=useCart();
 const drawerRef=useRef<HTMLElement>(null);
 useEffect(()=>{if(!open)return;
  const previousFocus=document.activeElement instanceof HTMLElement?document.activeElement:null;
  const listener=(event:KeyboardEvent)=>{
   if(event.key==="Escape"){setOpen(false);return;}
   if(event.key!=="Tab")return;
   const focusables=Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')??[]).filter(node=>node.getClientRects().length>0);
   if(!focusables.length)return;
   const first=focusables[0],last=focusables[focusables.length-1];
   if(event.shiftKey && (document.activeElement===first||!drawerRef.current?.contains(document.activeElement))){event.preventDefault();last.focus()}
   else if(!event.shiftKey && (document.activeElement===last||!drawerRef.current?.contains(document.activeElement))){event.preventDefault();first.focus()}
  };
  document.addEventListener("keydown",listener);
  const prior=document.body.style.overflow;document.body.style.overflow="hidden";
  return()=>{document.removeEventListener("keydown",listener);document.body.style.overflow=prior;previousFocus?.focus()};
 },[open,setOpen]);
 if(!open)return null;
 return <div className="fixed inset-0 z-[90]" role="presentation">
   <button type="button" className="absolute inset-0 bg-black/50 w-full cursor-default" onClick={()=>setOpen(false)} aria-label="Fechar sacola"/>
   <aside ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute top-0 right-0 h-full w-full max-w-[480px] bg-[var(--agade-page)] text-[var(--agade-ink)] flex flex-col shadow-2xl">
    <header className="px-6 py-6 flex items-center justify-between border-b border-[var(--agade-border)]">
     <div className="flex gap-3 items-center"><ShoppingBag size={22}/><h2 id="cart-title" className="text-xl font-semibold">Sua sacola</h2></div>
     <button type="button" autoFocus aria-label="Fechar sacola" className="p-2" onClick={()=>setOpen(false)}><X size={21}/></button>
    </header>
    <p className="px-6 py-4 text-xs text-[var(--agade-muted)] bg-[var(--agade-feature)] leading-relaxed">Lista de seleção local. Ela não reserva estoque nem gera pagamentos.</p>
    <div className="flex-1 overflow-y-auto px-6">
     {items.length===0?<div className="py-20 text-center">
      <p className="text-2xl mb-4" style={{fontFamily:"var(--font-serif)"}}>Sua sacola está vazia.</p>
      <p className="text-sm text-[var(--agade-muted)] mb-7">Escolha seus modelos favoritos para guardar nesta seleção.</p>
      <Link to="/loja" onClick={()=>setOpen(false)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--agade-accent)] text-white py-3 px-7 uppercase tracking-wider text-xs">Explorar óculos</Link>
     </div>:<ul className="divide-y divide-black/10">
      {items.map(item=><li key={item.variantId} className="py-6 flex gap-4">
       <div className="w-24 h-28 shrink-0 bg-[var(--agade-feature)] flex items-center justify-center overflow-hidden">
        {item.imageUrl?<img src={item.imageUrl} alt="" className="h-full w-full object-contain"/>:<span className="text-[10px] text-center text-[var(--agade-muted)]">Sem imagem</span>}
       </div>
       <div className="flex-1 min-w-0">
        <p className="font-semibold">{item.name}</p><p className="text-sm text-[var(--agade-muted)] mt-1">{item.color}</p>
        <p className="font-medium text-sm mt-2">{money(item.priceCents)}</p>
        <div className="flex justify-between items-center mt-4">
         <div className="flex items-center border border-[var(--agade-border)]">
          <button onClick={()=>changeQuantity(item.variantId,-1)} type="button" aria-label={`Diminuir quantidade de ${item.name}`} className="p-3 min-h-11 min-w-11 disabled:opacity-30" disabled={item.quantity<=1}><Minus size={14}/></button>
          <span className="w-7 text-center text-xs" aria-live="polite">{item.quantity}</span>
          <button onClick={()=>changeQuantity(item.variantId,1)} type="button" aria-label={`Aumentar quantidade de ${item.name}`} className="p-2 disabled:opacity-30" disabled={item.quantity>=item.stockSnapshot||item.quantity>=10}><Plus size={14}/></button>
         </div>
         <button type="button" onClick={()=>remove(item.variantId)} className="text-xs underline underline-offset-4 text-[var(--agade-muted)]">Remover</button>
        </div>
       </div>
      </li>)}
     </ul>}
    </div>
    {items.length>0&&<footer className="border-t border-[var(--agade-border)] px-6 py-6">
     <div className="flex justify-between font-semibold mb-3"><span>Subtotal estimado</span><span>{money(total)}</span></div>
     <p className="text-xs leading-relaxed text-[var(--agade-muted)] mb-5">Estes preços são apenas uma referência da seleção. Valor, estoque e frete serão conferidos no servidor antes de futuras compras.</p>
     <div className="w-full rounded-xl bg-[var(--agade-feature)] text-[var(--agade-accent-text)] py-4 px-5 text-center uppercase tracking-[.12em] text-xs font-semibold">Checkout ainda indisponível</div>
     <button onClick={clear} type="button" className="mt-5 text-xs text-[var(--agade-muted)] underline underline-offset-4">Limpar sacola</button>
    </footer>}
   </aside>
  </div>;
}
