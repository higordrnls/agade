import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
 productId: string; variantId: string; sku: string;
 name: string; color: string; priceCents: number; imageUrl: string|null;
 quantity: number; stockSnapshot: number;
};
type CartApi={items:CartItem[];total:number;quantity:number;open:boolean;setOpen:(value:boolean)=>void;add:(item:CartItem)=>void;remove:(variantId:string)=>void;changeQuantity:(variantId:string,delta:number)=>void;clear:()=>void};
const Context=createContext<CartApi|null>(null);
const storageKey="agade_selection_cart_v1";
function valid(value:unknown):value is CartItem {
 if(!value||typeof value!=="object")return false;
 const v=value as Partial<CartItem>;
 return typeof v.productId==="string"&&typeof v.variantId==="string"&&typeof v.sku==="string"&&typeof v.name==="string"&&typeof v.color==="string"
   &&Number.isInteger(v.priceCents)&&v.priceCents!>=0 &&Number.isInteger(v.quantity)&&v.quantity!>0&&v.quantity!<=10
   &&Number.isInteger(v.stockSnapshot)&&v.stockSnapshot!>0
   &&(v.imageUrl===null||typeof v.imageUrl==="string");
}
export function CartProvider({children}:{children:ReactNode}){
 const [items,setItems]=useState<CartItem[]>(()=>{
  try{const data=JSON.parse(localStorage.getItem(storageKey)||"[]");
    return Array.isArray(data)?data.filter(valid).slice(0,40):[];
  }catch{return []}
 });
 const [open,setOpen]=useState(false);
 useEffect(()=>{try{localStorage.setItem(storageKey,JSON.stringify(items))}catch{/* armazenamento indisponível */}},[items]);
 const api=useMemo<CartApi>(()=>({
  items,open,setOpen,
  quantity:items.reduce((sum,x)=>sum+x.quantity,0),
  // Valores do navegador são somente estimativas; checkout deve recalcular no servidor.
  total:items.reduce((sum,x)=>sum+x.quantity*x.priceCents,0),
  add:(item)=>{if(!valid(item))return;setItems(previous=>{
    const old=previous.find(v=>v.variantId===item.variantId);
    if(old)return previous.map(v=>v.variantId===item.variantId?{
     ...item,quantity:Math.min(10,item.stockSnapshot,old.quantity+1),
    }:v);
    return previous.length>=40?previous:[...previous,{...item,quantity:1}];
   });setOpen(true)},
  remove:(id)=>setItems(previous=>previous.filter(v=>v.variantId!==id)),
  changeQuantity:(id,delta)=>setItems(previous=>previous.map(v=>v.variantId===id?{
    ...v,quantity:Math.min(10,v.stockSnapshot,Math.max(1,v.quantity+delta)),
   }:v)),
  clear:()=>setItems([]),
 }),[items,open]);
 return <Context.Provider value={api}>{children}</Context.Provider>;
}
export function useCart(){
 const value=useContext(Context);if(!value)throw new Error("CartProvider ausente");return value;
}
