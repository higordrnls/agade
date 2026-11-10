// Public unsubscribe endpoint. This verifies an HMAC token issued by AGADE's
// future campaign sender; never issue unsubscribe signatures in the browser.
// Disabled by default. This function must be deployed with verify_jwt=false.
const originList=(Deno.env.get("AGADE_NEWSLETTER_ORIGIN")??"").split(",").map(s=>s.trim()).filter(s=>/^https:\/\//.test(s));
const cors=(origin:string)=>({
 "Access-Control-Allow-Origin":origin,
 "Access-Control-Allow-Headers":"content-type",
 "Access-Control-Allow-Methods":"POST, OPTIONS",
 "Cache-Control":"no-store",
 "Vary":"Origin",
});
const respond=(body:unknown,status:number,origin:string)=>Response.json(body,{status,headers:cors(origin)});
const validEmail=(email:unknown):email is string=>typeof email==="string" && email.length<=254 &&
 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validHex=(token:unknown):token is string=>typeof token==="string" && /^[0-9a-f]{64}$/.test(token);
async function expected(email:string,secret:string){
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const signed=new Uint8Array(await crypto.subtle.sign("HMAC",key,new TextEncoder().encode("agade-unsubscribe-v1:"+email)));
 return Array.from(signed).map(b=>b.toString(16).padStart(2,"0")).join("");
}
function constantTimeHexEqual(a:string,b:string){
 if(a.length!==b.length)return false;
 let diff=0;
 for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);
 return diff===0;
}
Deno.serve(async request=>{
 const origin=request.headers.get("origin")??"";
 if(!originList.includes(origin))return Response.json({error:"Origem não autorizada"},{status:403});
 if(request.method==="OPTIONS")return new Response(null,{status:204,headers:cors(origin)});
 if(request.method!=="POST")return respond({error:"Método não permitido"},405,origin);
 if(Deno.env.get("ENABLE_NEWSLETTER_SIGNUP")!=="true")return respond({error:"Serviço indisponível"},503,origin);
 const projectUrl=Deno.env.get("SUPABASE_URL");
 const admin=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
 const secret=Deno.env.get("AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET")??"";
 if(!projectUrl||!admin||secret.length<32)return respond({error:"Serviço indisponível"},503,origin);
 try{
  const body=await request.json();
  if(!validEmail(body?.email)||!validHex(body?.token))return respond({error:"Link inválido"},400,origin);
  const email=body.email.trim().toLowerCase();
  if(!constantTimeHexEqual(body.token,await expected(email,secret)))return respond({error:"Link inválido"},400,origin);
  const r=await fetch(`${projectUrl}/rest/v1/rpc/unsubscribe_newsletter_interest`,{
   method:"POST",
   headers:{apikey:admin,Authorization:`Bearer ${admin}`,"Content-Type":"application/json"},
   body:JSON.stringify({p_email:email})
  });
  if(!r.ok)return respond({error:"Não foi possível processar a solicitação"},503,origin);
  return respond({unsubscribed:true},200,origin);
 }catch{return respond({error:"Não foi possível processar a solicitação"},400,origin)}
});
