import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";

const envUrl=import.meta.env.VITE_SUPABASE_URL as string|undefined;
const envKey=(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||import.meta.env.VITE_SUPABASE_ANON_KEY) as string|undefined;
const configured=!!(envUrl&&envKey&&/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(envUrl));
const headers=()=>({
 apikey:envKey||"",
 ...(envKey?.startsWith("eyJ")?{Authorization:`Bearer ${envKey}`}:{}),
 "Content-Type":"application/json",
});
type Profile={email?:string;id?:string};
export default function Account(){
 const [email,setEmail]=useState("");
 const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
 const [message,setMessage]=useState("");
 const [profile,setProfile]=useState<Profile|null>(null);
 useEffect(()=>{
  if(!configured) return;
  // O link mágico retorna sessão temporária no fragmento; não guardamos token em analytics ou URLs.
  const params=new URLSearchParams(window.location.hash.slice(1));
  const freshToken=params.get("access_token");
  if(freshToken){
   sessionStorage.setItem("agade_auth_session",freshToken);
   history.replaceState(null,"",window.location.pathname+window.location.search);
  }
  const token=freshToken||sessionStorage.getItem("agade_auth_session");
  if(!token)return;
  fetch(`${envUrl!.replace(/\/$/,"")}/auth/v1/user`,{
   headers:{apikey:envKey!,Authorization:`Bearer ${token}`},
  }).then(r=>{if(!r.ok)throw new Error("Sessão expirada");return r.json()}).then((data:Profile)=>setProfile(data))
  .catch(()=>sessionStorage.removeItem("agade_auth_session"));
 },[]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!configured)return;
  setStatus("sending");
  try{
   const redirect=`${window.location.origin}/conta`;
   const res=await fetch(`${envUrl!.replace(/\/$/,"")}/auth/v1/otp?redirect_to=${encodeURIComponent(redirect)}`,{
    method:"POST",headers:headers(),
    body:JSON.stringify({email:email.trim().toLowerCase(),create_user:true}),
   });
   if(!res.ok)throw new Error("Não foi possível enviar o acesso. Confira a configuração de e-mail no Supabase.");
   setStatus("sent");setMessage("Se o endereço estiver apto a receber mensagens, enviaremos um link de acesso.");
  }catch(err){setStatus("error");setMessage(err instanceof Error?err.message:"Falha ao solicitar acesso");}
 }
 return <div className="bg-[#f5f6f9] min-h-[70vh] text-[#181818] py-16 md:py-24 px-6">
  <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
   <div>
    <p className="text-xs tracking-[.2em] text-[#102e90] uppercase font-semibold mb-7">AGADE / SUA CONTA</p>
    <h1 className="text-5xl md:text-6xl leading-[1.05]" style={{fontFamily:"var(--font-serif)"}}>Seu espaço, seu olhar.</h1>
    <p className="mt-7 text-[#555] leading-relaxed max-w-md">Entre com seu e-mail para acessar sua conta. Quando a loja começar a operar, você poderá acompanhar seus pedidos por aqui.</p>
    <div className="mt-10 border-t border-black/10 pt-7 flex items-start gap-3 text-sm text-[#666]"><LockKeyhole size={19} className="shrink-0"/> Não pedimos senha nesta etapa. O acesso por link de e-mail depende do Supabase Auth estar configurado.</div>
   </div>
   <div className="bg-white p-8 sm:p-10 shadow-sm self-start">
    {profile?<><p className="text-xs tracking-[.2em] uppercase text-[#102e90] mb-4">Conta identificada</p>
      <h2 className="text-3xl mb-5" style={{fontFamily:"var(--font-serif)"}}>Olá, {profile.email??"visitante"}.</h2>
      <p className="text-sm text-[#555] leading-relaxed mb-6">O histórico de pedidos ainda não está integrado. Nenhuma compra foi registrada por este painel.</p>
      <button type="button" className="border border-black px-6 py-3 text-sm" onClick={()=>{sessionStorage.removeItem("agade_auth_session");setProfile(null)}}>Sair da conta</button>
    </>:<>
     <div className="flex items-center gap-3 mb-7"><Mail size={22} className="text-[#102e90]"/><h2 className="text-2xl" style={{fontFamily:"var(--font-serif)"}}>Entrar por e-mail</h2></div>
     {!configured?<div role="status" className="bg-[#f2f3f7] p-5 text-sm leading-relaxed">Acesso em preparação. Estamos conectando a autenticação da loja; nenhum dado será enviado enquanto isso.</div>:
      <form onSubmit={submit} className="space-y-5">
       <div><label htmlFor="account-email" className="text-xs uppercase tracking-[.14em] font-medium">Seu e-mail</label>
        <input id="account-email" type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}
         className="mt-2 block w-full border border-black/25 px-4 py-4 outline-offset-2 focus:border-[#102e90]" placeholder="voce@exemplo.com"/></div>
       <button type="submit" disabled={status==="sending"} className="w-full bg-[#102e90] text-white px-6 py-4 uppercase tracking-[.14em] text-xs font-semibold disabled:opacity-50">
        {status==="sending"?"Solicitando…":"Receber link de acesso"}
       </button>
       {(status==="sent"||status==="error")&&<p role="status" className="text-sm leading-relaxed">{message}</p>}
      </form>}
     <p className="mt-7 text-xs leading-relaxed text-[#666]">Seu e-mail é usado somente para acesso à conta. A assinatura da newsletter é separada e opcional.</p>
    </>}
    <Link to="/ajuda" className="inline-flex gap-2 items-center mt-9 text-xs uppercase tracking-[.16em] border-b border-black pb-2">Precisa de ajuda? <ArrowRight size={16}/></Link>
   </div>
  </div>
 </div>;
}