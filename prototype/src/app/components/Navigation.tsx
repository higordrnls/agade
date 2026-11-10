import { Link, useLocation } from "react-router";
import { Menu, Search, X, ArrowUpRight, UserRound, CircleHelp, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const links = [
  {to:"/loja",label:"ÓCULOS DE SOL"},
  {to:"/sobre",label:"A AGADE"},
  {to:"/ajuda",label:"AJUDA"},
];
export default function Navigation() {
  const {pathname}=useLocation();
  const cart=useCart();
  const [open,setOpen]=useState(false);
  const [query,setQuery]=useState("");
  const [searchOpen,setSearchOpen]=useState(false);
  useEffect(()=>{setOpen(false);setSearchOpen(false)},[pathname]);
  return <header className="fixed top-0 inset-x-0 z-50 bg-white text-[#181818]">
    <div className="h-8 bg-[#102e90] text-white flex items-center justify-center px-4 text-[10px] sm:text-xs font-medium tracking-[.17em] uppercase">
      AGADE · Uma nova perspectiva em óculos de sol
    </div>
    <nav aria-label="Navegação principal" className="h-20 relative max-w-[1600px] mx-auto border-b border-black/10 px-5 sm:px-10 flex justify-between items-center">
      <div className="hidden lg:flex items-center gap-9 w-[35%]">
        {links.map(l=><Link to={l.to} aria-current={pathname===l.to?"page":undefined} key={l.to}
          className="text-[11px] tracking-[.13em] font-medium hover:text-[#102e90] transition-colors">{l.label}</Link>)}
      </div>
      <button type="button" aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open} aria-controls="agade-mobile-nav" onClick={()=>setOpen(!open)}
        className="lg:hidden p-2 -ml-2 focus-visible:outline-2 focus-visible:outline-offset-2">{open?<X size={22}/>:<Menu size={22}/>}</button>
      <Link to="/" aria-label="AGADE, página inicial" className="absolute left-1/2 -translate-x-1/2 text-3xl sm:text-[38px] tracking-[.12em] font-black leading-none" style={{fontFamily:"var(--font-sans)"}}>AGADE</Link>
      <div className="flex items-center justify-end gap-3 sm:gap-5 lg:w-[35%]">
        <button type="button" onClick={()=>setSearchOpen(!searchOpen)} aria-label="Buscar óculos" aria-expanded={searchOpen} className="p-2 focus-visible:outline-2">
          <Search size={21} strokeWidth={1.6}/></button>
        <button type="button" aria-label={`Abrir sacola com ${cart.quantity} itens`} onClick={()=>cart.setOpen(true)} className="p-2 relative hover:text-[#102e90]"><ShoppingBag size={21} strokeWidth={1.6}/>{cart.quantity>0&&<span className="absolute -top-1 -right-1 bg-[#102e90] text-white text-[9px] min-w-4 h-4 rounded-full flex items-center justify-center">{cart.quantity}</span>}</button>
        <Link to="/conta" aria-label="Minha conta" className="p-2 hover:text-[#102e90]"><UserRound size={21} strokeWidth={1.6}/></Link>
        <Link to="/ajuda" aria-label="Ajuda" className="hidden sm:inline-flex p-2 hover:text-[#102e90]"><CircleHelp size={20} strokeWidth={1.6}/></Link>
        <Link to="/loja" className="hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-[.15em] hover:text-[#102e90]">
          Ver seleção <ArrowUpRight size={14}/></Link>
      </div>
      {searchOpen && <form action="/loja" method="get" role="search" className="absolute top-full left-0 right-0 bg-white px-5 sm:px-10 py-4 border-b border-black/10 shadow-sm flex gap-3">
        <label htmlFor="header-search" className="sr-only">Buscar por modelo ou cor</label>
        <input id="header-search" autoFocus value={query} onChange={e=>setQuery(e.target.value)} name="busca"
          placeholder="Busque por modelo ou cor" className="flex-1 min-w-0 border-b border-black/30 py-2 text-sm focus:outline-none focus:border-[#102e90]"/>
        <button className="bg-[#102e90] text-white px-5 text-xs uppercase tracking-wider" type="submit">Buscar</button>
      </form>}
    </nav>
    {open && <div id="agade-mobile-nav" className="lg:hidden border-b border-black/10 px-6 py-6 bg-white flex flex-col gap-5 shadow-sm">
      {links.map(l=><Link key={l.to} to={l.to} className="text-lg tracking-wide" onClick={()=>setOpen(false)}>{l.label}</Link>)}
    </div>}
  </header>;
}