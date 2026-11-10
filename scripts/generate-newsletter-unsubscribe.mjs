// Use only on a trusted backend when preparing a campaign email.
// Example: AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET=... node scripts/generate-newsletter-unsubscribe.mjs client@example.com
// Never bundle this script/secret in the public frontend.
import { createHmac } from "node:crypto";

const email=process.argv[2]?.trim().toLowerCase();
const secret=process.env.AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET;
const origin=process.env.AGADE_NEWSLETTER_SITE_ORIGIN||"https://agade.pages.dev";
if(!email||!/^\S+@\S+\.\S+$/.test(email)||!secret||secret.length<32||!/^https:\/\/[^/]+$/.test(origin)){
 console.error("Informe email válido, AGADE_NEWSLETTER_UNSUBSCRIBE_SECRET (32+ caracteres) e origem HTTPS.");
 process.exitCode=1;
}else{
 const token=createHmac("sha256",secret).update("agade-unsubscribe-v1:"+email).digest("hex");
 const url=new URL("/cancelar-newsletter",origin);
 url.searchParams.set("email",email);
 url.searchParams.set("token",token);
 console.log(url.toString());
}
