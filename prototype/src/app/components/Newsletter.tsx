import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const endpoint=import.meta.env.VITE_AGADE_NEWSLETTER_ENDPOINT as string|undefined;
const unsubscribeEndpoint=import.meta.env.VITE_AGADE_NEWSLETTER_UNSUBSCRIBE_ENDPOINT as string|undefined;
const enabled=import.meta.env.VITE_AGADE_NEWSLETTER_ENABLED==="true" && !!unsubscribeEndpoint
 && /^https:\/\/[a-z0-9-]+\.supabase\.co\/functions\/v1\/newsletter-unsubscribe$/i.test(unsubscribeEndpoint)
 && !!endpoint && /^https:\/\/[a-z0-9-]+\.supabase\.co\/functions\/v1\/newsletter-subscribe$/i.test(endpoint);

export default function Newsletter(){
 const [email,setEmail]=useState("");
 const [consent,setConsent]=useState(false);
 const [honeypot,setHoneypot]=useState("");
 const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const [message,setMessage]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!enabled||!consent||status==="sending")return;
  setStatus("sending");
  try{
   const response=await fetch(endpoint!,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,consent,website:honeypot,source:"footer"}),
   });
   if(!response.ok)throw new Error("Não foi possível registrar seu interesse agora.");
   setStatus("sent");setEmail("");setConsent(false);
   setMessage("Recebemos seu interesse. Quando nossas mensagens começarem, cada e-mail terá um link de descadastro.");
  }catch(err){setStatus("error");setMessage(err instanceof Error?err.message:"Erro de conexão.");}
 }
 return <section aria-labelledby="newsletter-title" className="agade-newsletter px-6 sm:px-10 py-16 md:py-20">
  <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
   <div>
    <p className="text-[11px] uppercase tracking-[.21em] opacity-75 mb-5">AGADE / COMUNIDADE</p>
    <h2 id="newsletter-title" className="text-3xl sm:text-5xl leading-[1.08] font-normal" style={{fontFamily:"var(--font-serif)"}}>Quer saber quando chegar?</h2>
    <p className="mt-5 text-sm sm:text-base leading-relaxed max-w-xl">Estamos escolhendo os primeiros óculos da AGADE. Quando a lista estiver pronta, vamos contar por aqui.</p>
   </div>
   <div>
    {enabled?<form onSubmit={submit} className="space-y-4">
     <div className="flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">Seu e-mail</label>
      <input id="newsletter-email" required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}
       placeholder="seu@email.com" maxLength={254} className="flex-1 min-w-0 bg-white text-[#24372d] rounded-xl py-4 px-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"/>
      <button type="submit" disabled={!consent||status==="sending"} aria-label="Assinar novidades da AGADE" className="bg-white text-[#785254] rounded-xl px-5 min-w-12 min-h-12 disabled:opacity-45">
       <ArrowRight size={22}/>
      </button>
     </div>
     <div className="hidden" aria-hidden="true"><label>Website <input tabIndex={-1} value={honeypot} onChange={e=>setHoneypot(e.target.value)}/></label></div>
     <label className="flex gap-3 items-start text-xs leading-relaxed text-white/90 cursor-pointer">
      <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required className="mt-1 accent-white"/>
      Aceito receber comunicações da AGADE por e-mail. Posso revogar meu consentimento a qualquer momento.
     </label>
     <div className="flex flex-wrap items-center gap-4 text-xs"><Link to="/privacidade" className="underline underline-offset-4 text-white/90">Privacidade</Link><Link to="/cancelar-newsletter" className="underline underline-offset-4 text-white/90">Como cancelar</Link></div>
     {status!=="idle"&&<p role="status" className="text-sm">{status==="sending"?"Registrando…":message}</p>}
    </form>:<div role="status" className="agade-newsletter-panel rounded-xl px-6 py-5 text-sm leading-relaxed">
      Ainda não estamos recebendo inscrições por e-mail. Enquanto isso, acompanhe as novidades no <a href="https://www.instagram.com/itsagade/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Instagram @itsagade</a>.
    </div>}
   </div>
  </div>
 </section>;
}