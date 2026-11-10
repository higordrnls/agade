import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react";

const endpoint=import.meta.env.VITE_AGADE_NEWSLETTER_UNSUBSCRIBE_ENDPOINT as string|undefined;
const enabled=import.meta.env.VITE_AGADE_NEWSLETTER_ENABLED==="true"
 && !!endpoint
 && /^https:\/\/[a-z0-9-]+\.supabase\.co\/functions\/v1\/newsletter-unsubscribe$/i.test(endpoint);

export default function NewsletterUnsubscribe(){
 const [params]=useSearchParams();
 const email=params.get("email")??"";
 const token=params.get("token")??"";
 const valid= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^[0-9a-f]{64}$/.test(token);
 const [state,setState]=useState<"idle"|"sending"|"done"|"error">("idle");
 const [message,setMessage]=useState("");
 async function unsubscribe(){
  if(!enabled||!valid||state==="sending")return;
  setState("sending");setMessage("");
  try{
   const r=await fetch(endpoint!,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,token})});
   if(!r.ok)throw Error("Não foi possível confirmar o descadastro. Entre em contato com nosso atendimento.");
   setState("done");
   setMessage("Seu pedido de descadastro foi registrado. Você não receberá novas campanhas desta lista.");
   window.history.replaceState(null,"",window.location.pathname);
  }catch(e){setState("error");setMessage(e instanceof Error?e.message:"Não foi possível confirmar o descadastro.")}
 }
 return <div className="min-h-[65vh] bg-[#fffaf2] text-[#493630] px-6 sm:px-12 py-16 sm:py-24">
  <div className="max-w-xl mx-auto">
   <p className="text-xs uppercase tracking-[.17em] font-semibold text-[#a95e46] mb-6">AGADE / PRIVACIDADE</p>
   <h1 className="text-[clamp(2.9rem,6vw,5rem)] leading-[1.03] tracking-tight" style={{fontFamily:"var(--font-serif)"}}>Você decide o que recebe.</h1>
   <p className="mt-6 text-[#69564e] leading-relaxed">O envio de novidades é opcional. Você pode sair da lista sem precisar excluir sua conta da loja.</p>
   <div className="mt-9 bg-[#f3e8d9] rounded-2xl p-7 sm:p-9">
    {state==="done"?<div role="status">
     <MailCheck size={30} className="mb-5 text-[#56725b]"/>
     <h2 className="text-2xl mb-3" style={{fontFamily:"var(--font-serif)"}}>Tudo certo.</h2>
     <p className="text-sm leading-relaxed">{message}</p>
    </div>:!enabled||!valid?<div role="status">
     <ShieldCheck size={27} className="mb-5 text-[#a95e46]"/>
     <p className="leading-relaxed text-sm">Este link não está disponível ou expirou. Para solicitar o descadastro, escreva para <a href="mailto:atendimento@agade.com?subject=Descadastro%20newsletter%20AGADE" className="underline underline-offset-4 break-all">atendimento@agade.com</a>.</p>
    </div>:<>
     <p className="text-sm text-[#69564e] mb-6">Confirma que deseja deixar de receber novidades no endereço abaixo?</p>
     <p className="font-semibold break-all text-sm mb-7">{email}</p>
     <button type="button" onClick={unsubscribe} disabled={state==="sending"} className="min-h-12 rounded-xl bg-[#a95e46] text-white px-6 py-3 text-sm font-semibold disabled:opacity-50">{state==="sending"?"Processando…":"Confirmar descadastro"}</button>
     {message&&<p role="alert" className="text-sm mt-5 leading-relaxed">{message}</p>}
    </>}
   </div>
   <Link to="/" className="mt-8 inline-flex items-center gap-3 min-h-12 text-sm border-b border-[#785254]"><ArrowLeft size={17}/> Voltar à AGADE</Link>
  </div>
 </div>;
}
