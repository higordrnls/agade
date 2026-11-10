import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, LockKeyhole, Mail, CheckCircle2, LogOut } from "lucide-react";

const projectUrl=(import.meta.env.VITE_SUPABASE_URL as string|undefined)?.replace(/\/$/,"");
const publicKey=(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||import.meta.env.VITE_SUPABASE_ANON_KEY) as string|undefined;
const enabled=import.meta.env.VITE_AGADE_AUTH_ENABLED==="true"
 && !!projectUrl && !!publicKey && /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(projectUrl);
const tokenStore="agade-auth-v2";
type Session={access_token:string;refresh_token:string;expires_at:number};
type Profile={id:string;email?:string};
const headers=()=>({apikey:publicKey||"", "Content-Type":"application/json", ...(publicKey?.startsWith("eyJ")?{Authorization:`Bearer ${publicKey}`}:{})});
function saveSession(session:Session){sessionStorage.setItem(tokenStore,JSON.stringify(session))}
function readSession():Session|null{
 try{
  const parsed=JSON.parse(sessionStorage.getItem(tokenStore)||"null");
  return parsed && typeof parsed.access_token==="string" && typeof parsed.refresh_token==="string" && Number.isFinite(parsed.expires_at) ? parsed as Session:null;
 }catch{return null}
}
function clearSession(){sessionStorage.removeItem(tokenStore);sessionStorage.removeItem("agade_auth_session")}
function fromResponse(data:unknown):Session|null{
 if(!data||typeof data!=="object")return null;
 const d=data as Record<string,unknown>;
 if(typeof d.access_token!=="string"||typeof d.refresh_token!=="string"||typeof d.expires_in!=="number")return null;
 return {access_token:d.access_token,refresh_token:d.refresh_token,expires_at:Math.floor(Date.now()/1000)+d.expires_in};
}
async function refreshSession(current:Session):Promise<Session>{
 const res=await fetch(`${projectUrl}/auth/v1/token?grant_type=refresh_token`,{
  method:"POST",headers:headers(),body:JSON.stringify({refresh_token:current.refresh_token})
 });
 const renewed=res.ok?fromResponse(await res.json()):null;
 if(!renewed)throw Error("Sessão expirada");
 saveSession(renewed);return renewed;
}
async function fetchProfile(session:Session):Promise<Profile>{
 const current=session.expires_at<=Math.floor(Date.now()/1000)+60 ? await refreshSession(session):session;
 let response=await fetch(`${projectUrl}/auth/v1/user`,{headers:{apikey:publicKey!,Authorization:`Bearer ${current.access_token}`}});
 if(response.status===401){
  const renewed=await refreshSession(current);
  response=await fetch(`${projectUrl}/auth/v1/user`,{headers:{apikey:publicKey!,Authorization:`Bearer ${renewed.access_token}`}});
 }
 if(!response.ok)throw Error("Não foi possível validar sua sessão");
 const p=await response.json();
 if(typeof p.id!=="string")throw Error("Conta inválida");
 return {id:p.id,email:typeof p.email==="string"?p.email:undefined};
}

export default function Account(){
 const [email,setEmail]=useState("");
 const [state,setState]=useState<"idle"|"loading"|"sending"|"sent"|"error">("idle");
 const [message,setMessage]=useState("");
 const [profile,setProfile]=useState<Profile|null>(null);
 useEffect(()=>{
  if(!enabled)return;
  let active=true;
  const fragment=new URLSearchParams(window.location.hash.slice(1));
  const token=fragment.get("access_token"),refresh=fragment.get("refresh_token");
  const expiry=Number(fragment.get("expires_in"));
  const error=fragment.get("error_description")||fragment.get("error");
  // Supabase implicit flow only: clear sensitive fragment before any other action.
  if(token||error||refresh)history.replaceState(null,"",window.location.pathname+window.location.search);
  if(error){setMessage("Este link de acesso expirou ou não foi aceito. Peça outro.");setState("error");return}
  let current=readSession();
  if(token&&refresh&&Number.isFinite(expiry)&&expiry>0){
   current={access_token:token,refresh_token:refresh,expires_at:Math.floor(Date.now()/1000)+expiry};
   saveSession(current);
  }
  if(!current)return;
  setState("loading");
  fetchProfile(current).then(p=>{if(active){setProfile(p);setState("idle")}})
   .catch(()=>{clearSession();if(active){setState("error");setMessage("Sua sessão terminou. Entre novamente por e-mail.")}});
  return()=>{active=false};
 },[]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(!enabled||state==="sending")return;
  setState("sending");setMessage("");
  try{
   const redirect=`${window.location.origin}/conta`;
   const response=await fetch(`${projectUrl}/auth/v1/otp?redirect_to=${encodeURIComponent(redirect)}`,{
    method:"POST",headers:headers(),body:JSON.stringify({email:email.trim().toLowerCase(),create_user:true})
   });
   if(!response.ok)throw Error("Não conseguimos enviar o link agora. Tente novamente mais tarde.");
   setState("sent");setMessage("Confira sua caixa de entrada. Se o e-mail estiver apto a receber mensagens, o link chegará por lá.");
  }catch(e){setState("error");setMessage(e instanceof Error?e.message:"Não foi possível enviar o acesso.")}
 }
 async function logout(){
  const current=readSession();clearSession();setProfile(null);setState("idle");
  if(current)try{await fetch(`${projectUrl}/auth/v1/logout`,{method:"POST",headers:{apikey:publicKey!,Authorization:`Bearer ${current.access_token}`}})}catch{/* A sessão local já foi encerrada. */}
 }
 return <div className="bg-[#fffaf2] min-h-[65vh] text-[#493630] px-6 sm:px-10 py-14 sm:py-20">
  <div className="max-w-[1120px] mx-auto grid md:grid-cols-[1fr_.9fr] gap-10 lg:gap-20">
   <div>
    <p className="text-xs font-semibold tracking-[.17em] text-[#a95e46] uppercase mb-6">AGADE / SUA CONTA</p>
    <h1 className="text-[clamp(3.4rem,6vw,6.2rem)] leading-[1] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Seu espaço na AGADE.</h1>
    <p className="mt-7 text-[#69564e] leading-relaxed max-w-md">Quando a loja começar a receber pedidos, será por aqui que você poderá consultar suas compras. O acesso será feito por um link enviado ao seu e-mail.</p>
    <div className="mt-10 border-t border-[#dacabc] pt-7 flex items-start gap-3 text-sm text-[#69564e]">
     <LockKeyhole size={20} className="shrink-0 text-[#a95e46]"/> Sem senha para decorar. O link é pessoal e deve ser aberto apenas por você.
    </div>
   </div>
   <div className="bg-[#f5eadb] rounded-2xl p-7 sm:p-10 self-start">
    {profile?<div>
     <CheckCircle2 size={28} className="text-[#56725b] mb-5"/>
     <h2 className="text-3xl mb-4" style={{fontFamily:"var(--font-serif)"}}>Você entrou.</h2>
     <p className="text-sm break-all">{profile.email}</p>
     <p className="text-sm text-[#69564e] leading-relaxed mt-6">O histórico de pedidos ainda não está integrado e nenhuma compra pode ser realizada nesta etapa.</p>
     <button type="button" className="mt-8 min-h-12 inline-flex gap-3 items-center rounded-xl border border-[#785254] px-5" onClick={logout}><LogOut size={17}/> Sair da conta</button>
    </div>:<>
     <div className="flex gap-3 items-center mb-7"><Mail size={22} className="text-[#a95e46]"/><h2 className="text-2xl" style={{fontFamily:"var(--font-serif)"}}>Acessar por e-mail</h2></div>
     {!enabled?<div role="status" className="bg-[#fffaf2] p-5 rounded-xl text-sm text-[#69564e] leading-relaxed">O acesso está em preparação. Não estamos recebendo dados de login por esta página neste momento.</div>:
      <form onSubmit={submit} className="space-y-5">
       <div><label htmlFor="account-email" className="block text-sm mb-2 font-medium">Seu e-mail</label>
        <input id="account-email" type="email" required autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)}
          className="block w-full rounded-xl border border-[#b5a094] bg-[#fffaf2] px-4 py-4 text-base outline-offset-2 focus-visible:outline-[#a95e46]" placeholder="voce@exemplo.com"/></div>
       <button type="submit" disabled={state==="sending"||state==="loading"} className="min-h-12 w-full rounded-xl bg-[#a95e46] hover:bg-[#884735] text-white px-6 py-4 text-sm font-semibold disabled:opacity-50">
        {state==="sending"?"Enviando…":"Receber link de acesso"}
       </button>
       {message&&<p role="status" aria-live="polite" className="text-sm leading-relaxed">{message}</p>}
      </form>}
     <p className="mt-7 text-xs leading-relaxed text-[#69564e]">O e-mail de acesso não inscreve você na newsletter. São serviços diferentes.</p>
    </>}
    <Link to="/ajuda" className="inline-flex items-center gap-3 mt-9 min-h-11 text-sm border-b border-[#785254]">Precisa de ajuda? <ArrowRight size={17}/></Link>
   </div>
  </div>
 </div>;
}
