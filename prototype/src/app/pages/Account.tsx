import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, LockKeyhole, Mail, CheckCircle2, LogOut, Eye, EyeOff } from "lucide-react";

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


type CustomerProfile={full_name:string;phone_mobile:string|null};
const cleanPhone=(value:string)=>value.replace(/\D/g,"");
const validPhone=(value:string)=>/^[1-9][0-9]{10}$/.test(cleanPhone(value));
function apiHeaders(accessToken:string){return {apikey:publicKey!,Authorization:`Bearer ${accessToken}`,"Content-Type":"application/json"}}
async function currentSession(){
 const session=readSession();if(!session)throw Error("Faça login novamente.");
 return session.expires_at<=Math.floor(Date.now()/1000)+60?refreshSession(session):session;
}
async function fetchCustomer():Promise<CustomerProfile|null>{
 const session=await currentSession();
 const response=await fetch(`${projectUrl}/rest/v1/customer_profiles?select=full_name,phone_mobile&limit=1`,{headers:apiHeaders(session.access_token)});
 if(!response.ok)throw Error("Não foi possível carregar seus dados.");
 const rows=await response.json();
 return rows.length?rows[0]:null;
}
async function saveCustomer(fullName:string,phone:string):Promise<void>{
 const session=await currentSession();
 const user=await fetchProfile(session);
 const response=await fetch(`${projectUrl}/rest/v1/customer_profiles?on_conflict=user_id`,{
  method:"POST",headers:{...apiHeaders(session.access_token),Prefer:"resolution=merge-duplicates,return=minimal"},
  body:JSON.stringify({user_id:user.id,full_name:fullName.trim(),phone_mobile:cleanPhone(phone)||null})
 });
 if(!response.ok)throw Error("Não foi possível salvar o cadastro. Ele pode estar em preparação no banco.");
}
export default function Account(){
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [showPassword,setShowPassword]=useState(false);
 const [passwordAgain,setPasswordAgain]=useState("");
 const [mode,setMode]=useState<"login"|"register"|"recover"|"magic">("login");
 const [state,setState]=useState<"idle"|"loading"|"sending"|"sent"|"error">("idle");
 const [message,setMessage]=useState("");
 const [profile,setProfile]=useState<Profile|null>(null);
 const [fullName,setFullName]=useState("");
 const [phone,setPhone]=useState("");
 const [profileState,setProfileState]=useState<"loading"|"idle"|"saving"|"saved"|"error">("idle");
 const [profileMessage,setProfileMessage]=useState("");
 const [recoveryMode,setRecoveryMode]=useState(false);
 useEffect(()=>{
  if(!enabled)return;
  let active=true;
  const fragment=new URLSearchParams(window.location.hash.slice(1));
  const token=fragment.get("access_token"),refresh=fragment.get("refresh_token");
  const expiry=Number(fragment.get("expires_in"));
  const kind=fragment.get("type");
  const error=fragment.get("error_description")||fragment.get("error");
  if(token||error||refresh)history.replaceState(null,"",window.location.pathname+window.location.search);
  if(error){setMessage("Este link expirou ou não foi aceito. Solicite outro.");setState("error");return}
  let current=readSession();
  if(token&&refresh&&Number.isFinite(expiry)&&expiry>0){
   current={access_token:token,refresh_token:refresh,expires_at:Math.floor(Date.now()/1000)+expiry};
   saveSession(current);
   if(kind==="recovery")setRecoveryMode(true);
  }
  if(!current)return;
  setState("loading");
  fetchProfile(current).then(p=>{if(active){setProfile(p);setState("idle")}})
   .catch(()=>{clearSession();if(active){setState("error");setMessage("Sua sessão terminou. Entre novamente.")}});
  return()=>{active=false};
 },[]);
 useEffect(()=>{
  if(!profile)return;
  let active=true;
  setProfileState("loading");
  fetchCustomer().then(record=>{if(active){setFullName(record?.full_name??"");setPhone(record?.phone_mobile??"");setProfileState("idle")}})
  .catch(()=>{if(active){setProfileState("error");setProfileMessage("O cadastro complementar ainda não está disponível. O login continua funcionando.")}});
  return()=>{active=false};
 },[profile?.id]);
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(!enabled||state==="sending")return;
  setState("sending");setMessage("");
  const normalized=email.trim().toLowerCase();
  try{
   const redirect=`${window.location.origin}/conta`;
   if(mode==="login"){
    const response=await fetch(`${projectUrl}/auth/v1/token?grant_type=password`,{method:"POST",headers:headers(),body:JSON.stringify({email:normalized,password})});
    if(!response.ok)throw Error("Não foi possível entrar. Confira o e-mail, a senha e se a conta foi confirmada.");
    const session=fromResponse(await response.json());
    if(!session)throw Error("Resposta de autenticação inválida.");
    saveSession(session);setPassword("");
    setProfile(await fetchProfile(session));setState("idle");
    return;
   }
   if(mode==="register"){
    if(password.length<12)throw Error("Crie uma senha com pelo menos 12 caracteres.");
    if(password!==passwordAgain)throw Error("As senhas não são iguais.");
    const response=await fetch(`${projectUrl}/auth/v1/signup?redirect_to=${encodeURIComponent(redirect)}`,{
     method:"POST",headers:headers(),body:JSON.stringify({email:normalized,password})
    });
    if(!response.ok)throw Error("Não foi possível criar a conta. Tente outro e-mail ou solicite recuperação de acesso.");
    setPassword("");setPasswordAgain("");setState("sent");
    setMessage("Cadastro solicitado. Confira seu e-mail para confirmar a conta antes de entrar. A confirmação depende do serviço de envio do Supabase.");
    return;
   }
   const path=mode==="recover"?"recover":"otp";
   const body=mode==="recover"?{email:normalized}:{email:normalized,create_user:false};
   const response=await fetch(`${projectUrl}/auth/v1/${path}?redirect_to=${encodeURIComponent(redirect)}`,{
    method:"POST",headers:headers(),body:JSON.stringify(body)
   });
   if(!response.ok)throw Error("Não foi possível enviar o e-mail. Tente novamente mais tarde.");
   setState("sent");setMessage(mode==="recover"
    ?"Se o endereço estiver cadastrado, você receberá um link para criar uma nova senha."
    :"Se o endereço estiver cadastrado, enviaremos um link de acesso.");
  }catch(e){setState("error");setMessage(e instanceof Error?e.message:"Não foi possível concluir a solicitação.")}
 }
 async function updatePassword(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setState("sending");setMessage("");
  if(password.length<12||password!==passwordAgain){setState("error");setMessage("Use pelo menos 12 caracteres e confirme a mesma senha.");return}
  try{
   const current=await currentSession();
   const response=await fetch(`${projectUrl}/auth/v1/user`,{
    method:"PUT",headers:apiHeaders(current.access_token),body:JSON.stringify({password})
   });
   if(!response.ok)throw Error("Não foi possível atualizar a senha. Solicite outro link.");
   setPassword("");setPasswordAgain("");setRecoveryMode(false);setState("idle");
   setMessage("Senha atualizada com sucesso.");
  }catch(e){setState("error");setMessage(e instanceof Error?e.message:"Falha ao alterar senha.")}
 }
 async function submitCustomer(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setProfileMessage("");
  if(fullName.trim().length<3||fullName.trim().length>120){setProfileState("error");setProfileMessage("Informe seu nome completo.");return}
  if(phone&&!validPhone(phone)){setProfileState("error");setProfileMessage("Informe um celular brasileiro válido, com DDD.");return}
  setProfileState("saving");
  try{await saveCustomer(fullName,phone);setProfileState("saved");setProfileMessage("Seus dados foram salvos.")}
  catch(e){setProfileState("error");setProfileMessage(e instanceof Error?e.message:"Não foi possível salvar seus dados.")}
 }
 async function logout(){
  const current=readSession();clearSession();setProfile(null);setFullName("");setPhone("");setRecoveryMode(false);setState("idle");
  if(current)try{await fetch(`${projectUrl}/auth/v1/logout`,{method:"POST",headers:apiHeaders(current.access_token)})}catch{/* sessão local encerrada */}
 }
 const busy=state==="sending"||state==="loading";
 return <div className="bg-[#fffaf2] min-h-[65vh] text-[#493630] px-6 sm:px-10 py-14 sm:py-20">
  <div className="max-w-[1120px] mx-auto grid md:grid-cols-[1fr_.95fr] gap-10 lg:gap-20">
   <div>
    <p className="text-xs font-semibold tracking-[.17em] text-[#a95e46] uppercase mb-6">AGADE / SUA CONTA</p>
    <h1 className="text-[clamp(3.4rem,6vw,6.2rem)] leading-[1] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Seu espaço na AGADE.</h1>
    <p className="mt-7 text-[#69564e] leading-relaxed max-w-md">Crie seu cadastro, entre com senha e mantenha seus dados atualizados. Quando a loja começar a vender, será possível consultar seus pedidos por aqui.</p>
    <div className="mt-10 border-t border-[#dacabc] pt-7 flex items-start gap-3 text-sm text-[#69564e]">
     <LockKeyhole size={20} className="shrink-0 text-[#a95e46]"/> O acesso é protegido pelo Supabase Auth. Não armazenamos sua senha no cadastro de clientes.
    </div>
   </div>
   <div className="bg-[#f5eadb] rounded-2xl p-7 sm:p-10 self-start">
    {profile?<div>
     <CheckCircle2 size={28} className="text-[#56725b] mb-4"/>
     <h2 className="text-3xl mb-3" style={{fontFamily:"var(--font-serif)"}}>Minha conta</h2>
     <p className="text-sm break-all">{profile.email}</p>
     {recoveryMode?<form className="mt-8 space-y-4" onSubmit={updatePassword}>
      <h3 className="text-xl font-semibold">Definir nova senha</h3>
      <label className="block text-sm">Nova senha (mínimo de 12 caracteres)<input type="password" autoComplete="new-password" minLength={12} required value={password} onChange={e=>setPassword(e.target.value)} className="block mt-2 w-full bg-white rounded-xl border border-[#b5a094] p-3"/></label>
      <label className="block text-sm">Confirmar senha<input type="password" autoComplete="new-password" minLength={12} required value={passwordAgain} onChange={e=>setPasswordAgain(e.target.value)} className="block mt-2 w-full bg-white rounded-xl border border-[#b5a094] p-3"/></label>
      <button disabled={busy} className="rounded-xl bg-[#a95e46] text-white px-5 min-h-12 disabled:opacity-50">Salvar senha</button>
     </form>:null}
     {message&&<p className="mt-4 text-sm" role="status">{message}</p>}
     <form onSubmit={submitCustomer} className="mt-8 space-y-5 border-t border-[#d4bfb1] pt-7">
      <h3 className="text-xl font-semibold">Dados do cliente</h3>
      <p className="text-xs leading-relaxed text-[#69564e]">Nome completo e celular são opcionais agora. Dados fiscais e endereço serão solicitados somente quando forem necessários para uma compra.</p>
      <label className="block text-sm font-medium">Nome completo<input type="text" autoComplete="name" maxLength={120} required value={fullName} onChange={e=>setFullName(e.target.value)} className="block mt-2 w-full bg-white rounded-xl border border-[#b5a094] p-3 text-base"/></label>
      <label className="block text-sm font-medium">Celular com DDD (opcional)<input type="tel" autoComplete="tel-national" inputMode="tel" maxLength={20} placeholder="(34) 99999-9999" value={phone} onChange={e=>setPhone(e.target.value)} className="block mt-2 w-full bg-white rounded-xl border border-[#b5a094] p-3 text-base"/></label>
      <button type="submit" disabled={profileState==="saving"||profileState==="loading"} className="rounded-xl bg-[#a95e46] text-white px-6 min-h-12 disabled:opacity-50">{profileState==="saving"?"Salvando…":"Salvar meus dados"}</button>
      {profileMessage&&<p role="status" className="text-sm leading-relaxed">{profileMessage}</p>}
     </form>
     <p className="text-xs text-[#69564e] leading-relaxed mt-7">O histórico de pedidos ainda não está integrado e nenhuma compra pode ser realizada nesta etapa.</p>
     <button type="button" className="mt-7 min-h-12 inline-flex gap-3 items-center rounded-xl border border-[#785254] px-5" onClick={logout}><LogOut size={17}/> Sair da conta</button>
    </div>:<>
     <div className="flex gap-3 items-center mb-6"><Mail size={22} className="text-[#a95e46]"/><h2 className="text-2xl" style={{fontFamily:"var(--font-serif)"}}>{mode==="login"?"Entrar":mode==="register"?"Criar conta":mode==="recover"?"Recuperar senha":"Acessar sem senha"}</h2></div>
     {!enabled?<div role="status" className="bg-[#fffaf2] p-5 rounded-xl text-sm text-[#69564e] leading-relaxed">O acesso está em preparação. Não estamos recebendo dados de login por esta página neste momento.</div>:
      <>
      <div className="flex gap-2 mb-7" role="group" aria-label="Tipo de acesso">
       {([{key:"login",title:"Entrar"},{key:"register",title:"Cadastrar"}] as const).map(item=><button type="button" key={item.key} aria-pressed={mode===item.key} onClick={()=>{setMode(item.key);setMessage("");setState("idle");setPassword("");setPasswordAgain("")}} className={`min-h-11 flex-1 rounded-full border px-4 text-sm font-semibold ${mode===item.key?"bg-[#785254] text-white":"border-[#785254] text-[#785254]"}`}>{item.title}</button>)}
      </div>
      <form onSubmit={submit} className="space-y-5">
       <label htmlFor="account-email" className="block text-sm font-medium">E-mail<input id="account-email" type="email" required autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className="block mt-2 w-full rounded-xl border border-[#b5a094] bg-[#fffaf2] px-4 py-3 text-base outline-offset-2 focus-visible:outline-[#a95e46]" placeholder="voce@exemplo.com"/></label>
       {(mode==="login"||mode==="register")&&<div>
        <label htmlFor="account-password" className="block text-sm font-medium">Senha {mode==="register"?"(mínimo de 12 caracteres)":""}</label>
        <div className="flex items-center mt-2 rounded-xl border border-[#b5a094] bg-[#fffaf2]">
         <input id="account-password" type={showPassword?"text":"password"} required autoComplete={mode==="register"?"new-password":"current-password"} minLength={mode==="register"?12:undefined} value={password} onChange={e=>setPassword(e.target.value)} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base outline-offset-2"/>
         <button type="button" onClick={()=>setShowPassword(!showPassword)} className="min-w-12 min-h-12 flex items-center justify-center" aria-label={showPassword?"Ocultar senha":"Mostrar senha"}>{showPassword?<EyeOff size={19}/>:<Eye size={19}/>}</button>
        </div>
       </div>}
       {mode==="register"&&<label className="block text-sm font-medium">Confirme a senha<input type="password" autoComplete="new-password" minLength={12} required value={passwordAgain} onChange={e=>setPasswordAgain(e.target.value)} className="block mt-2 w-full rounded-xl border border-[#b5a094] bg-[#fffaf2] px-4 py-3 text-base"/></label>}
       {mode==="register"&&<p className="text-xs leading-relaxed text-[#69564e]">Ao se cadastrar, você aceita os <Link className="underline" to="/politicas">termos comerciais</Link> e toma ciência da <Link className="underline" to="/privacidade">Política de Privacidade</Link>. A newsletter é opcional e independente.</p>}
       <button type="submit" disabled={busy} className="min-h-12 w-full rounded-xl bg-[#a95e46] hover:bg-[#884735] text-white px-6 py-4 text-sm font-semibold disabled:opacity-50">{busy?"Enviando…":mode==="login"?"Entrar com senha":mode==="register"?"Criar cadastro":mode==="recover"?"Enviar link para redefinir":"Receber link de acesso"}</button>
       {message&&<p role="status" aria-live="polite" className="text-sm leading-relaxed">{message}</p>}
      </form>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
       <button type="button" onClick={()=>{setMode("recover");setMessage("")}} className="underline underline-offset-4">Esqueci minha senha</button>
       <button type="button" onClick={()=>{setMode("magic");setMessage("")}} className="underline underline-offset-4">Entrar com link por e-mail</button>
      </div>
      </>}
     <p className="mt-7 text-xs leading-relaxed text-[#69564e]">A criação de conta não inscreve você na newsletter.</p>
    </>}
    <Link to="/ajuda" className="inline-flex items-center gap-3 mt-9 min-h-11 text-sm border-b border-[#785254]">Precisa de ajuda? <ArrowRight size={17}/></Link>
   </div>
  </div>
 </div>;
}
