import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src=(name)=>readFileSync(new URL('../src/app/'+name,import.meta.url),'utf8');
test('public navigation has no manufacturing or conceptual collection',()=>{
 const nav=src('components/Navigation.tsx');
 assert.match(nav,/ÓCULOS DE SOL/);
 assert.match(nav,/A AGADE/);
 assert.doesNotMatch(nav,/Technology|Collection|Sustainability|3D|fabricaç|fabril/i);
});
test('public routes do not mount historical factory pages',()=>{
 const routes=src('routes.ts');
 assert.match(routes,/Storefront/);
 assert.match(routes,/About/);
 for(const forbidden of ['import Story','import Technology','import Collection','import Sustainability']){
  assert.ok(!routes.includes(forbidden),forbidden);
 }
 assert.match(routes,/createElement\(Navigate/);
});
test('commercial pages do not claim on-demand manufacture',()=>{
 for(const name of ['pages/Home.tsx','pages/Storefront.tsx','pages/About.tsx','components/Footer.tsx']){
  assert.doesNotMatch(src(name),/impressão 3D|PETG|reciclad|fabricad[oa]|fabril|printing|factory/i,name);
 }
});
test('checkout is not exposed as operational',()=>{
 assert.match(src('pages/Storefront.tsx'),/Ver detalhes e variações/);
 assert.match(src('pages/Product.tsx'),/Compra online em preparação/);
 assert.match(src('pages/Home.tsx'),/loadStorefrontCatalog/);
});

test('product details use live catalog and per-variant technical claims',()=>{
 const page=src('pages/Product.tsx');
 assert.match(page,/loadStorefrontCatalog/);
 assert.match(page,/variant\.uv_claim/);
 assert.match(page,/variant\.polarized_claim/);
 assert.match(page,/Compra online em preparação/);
 assert.doesNotMatch(page,/certificado UV400|100% de proteção|frete grátis garantido/i);
});
test('account does not pretend to show orders',()=>{
 const page=src('pages/Account.tsx');
 assert.match(page,/const path="recover"/);
 assert.match(page,/histórico de pedidos ainda não está integrado/i);
});
test('newsletter never pretends to capture emails when backend is absent',()=>{
 const page=src('components/Newsletter.tsx');
 assert.match(page,/VITE_AGADE_NEWSLETTER_ENABLED/);
 assert.match(page,/consent/);
 assert.match(page,/Ainda não estamos recebendo inscrições por e-mail/);
});
test('help clearly describes checkout and shipping not active',()=>{
 const page=src('pages/Help.tsx');
 assert.match(page,/Ainda não/);
 assert.match(page,/Não anunciamos frete grátis/);
 assert.match(page,/certificações/);
});

test('selection cart cannot initiate payment',()=>{
 const cart=src('components/CartDrawer.tsx');
 assert.match(cart,/Checkout ainda indisponível/);
 assert.match(cart,/não reserva estoque/);
 const context=src('context/CartContext.tsx');
 assert.match(context,/stockSnapshot/);
});
test('public shopping guide is separate from certificate claims',()=>{
 const guide=src('pages/Guide.tsx');
 assert.match(guide,/não confunda descrição comercial com laudo independente/);
 assert.match(src('routes.ts'),/Component: Guide/);
});

test('public pages do not advertise city or imagined shipping offers',()=>{
 for(const name of ['pages/Home.tsx','pages/About.tsx','pages/Help.tsx','components/Footer.tsx','components/Navigation.tsx','pages/Storefront.tsx']){
  assert.doesNotMatch(src(name),/Uberlândia|Minas Gerais|frete grátis nas compras/i,name);
 }
});
test('commerce policy provides statutory consumer rights and contact',()=>{
 const p=src('pages/Policies.tsx');
 assert.match(p,/7 dias corridos/);
 assert.match(p,/90 dias/);
 assert.match(p,/atendimento@agade.com/);
 assert.match(p,/frete de entrega será pago pelo cliente/i);
 assert.match(src('routes.ts'),/Component: Policies/);
});

test('editorial homepage uses licensed placeholder photography instead of digital eyewear mockups',()=>{
 const home=src('pages/Home.tsx');
 const about=src('pages/About.tsx');
 const store=src('pages/Storefront.tsx');
 assert.match(home,/photo\(9485735,1600\)/);
 assert.match(home,/photo\(36409245,1100\)/);
 assert.match(home,/photo\(37428896,850\)/);
 assert.match(home,/photo\(10388460,1250\)/);
 assert.match(home,/min-h-\[320px\] h-\[47svh\]/);
 assert.match(home,/Imagens ilustrativas licenciadas via Pexels/);
 assert.match(about,/Pexels/);
 assert.match(store,/não é produto AGADE/);
 assert.doesNotMatch(home,/05-horizonte\.png|11-aura\.png|12-marco-zero\.png/);
 assert.doesNotMatch(about,/11-aura\.png/);
});

test('zero-stock product variant cannot be saved to selection cart',()=>{
 const page=src('pages/Product.tsx');
 assert.match(page,/variant\.sellable_stock>0/);
 assert.match(page,/disabled=\{!available\}/);
 assert.match(page,/disabled=\{v\.sellable_stock<=0\}/);
});
test('cart drawer traps and restores keyboard focus',()=>{
 const page=src('components/CartDrawer.tsx');
 assert.match(page,/drawerRef/);
 assert.match(page,/event\.key!=="Tab"/);
 assert.match(page,/previousFocus\?\.focus\(\)/);
 assert.match(page,/aria-modal="true"/);
});

test('login explicitly gates activation and supports refresh/logout without exposing secrets',()=>{
 const auth=src('pages/Account.tsx');
 assert.match(auth,/VITE_AGADE_AUTH_ENABLED/);
 assert.match(auth,/grant_type=refresh_token/);
 assert.match(auth,/auth\/v1\/logout/);
 assert.match(auth,/history\.replaceState/);
 assert.doesNotMatch(auth,/service_role|sb_secret_/i);
});
test('newsletter cannot activate until unsubscribe endpoint is configured',()=>{
 const n=src('components/Newsletter.tsx');
 assert.match(n,/VITE_AGADE_NEWSLETTER_UNSUBSCRIBE_ENDPOINT/);
 assert.match(n,/VITE_AGADE_NEWSLETTER_ENABLED/);
 assert.match(n,/consent/);
 assert.match(n,/Ainda não estamos recebendo inscrições por e-mail/);
 const unsub=src('pages/NewsletterUnsubscribe.tsx');
 assert.match(unsub,/Confirmar descadastro/);
 assert.match(unsub,/newsletter-unsubscribe/);
 assert.match(src('routes.ts'),/cancelar-newsletter/);
});

test('account supports password sign-in, signup and recovery with separate customer profile',()=>{
 const page=src('pages/Account.tsx');
 assert.match(page,/grant_type=password/);
 assert.match(page,/auth\/v1\/signup/);
 assert.match(page,/const path="recover"/);
 assert.match(page,/customer_profiles/);
 assert.match(page,/full_name/);
 assert.match(page,/phone_mobile/);
 assert.match(page,/histórico de pedidos ainda não está integrado/i);
 assert.doesNotMatch(page,/service_role|sb_secret_|localStorage\.setItem\(["']password/i);
});

test('customer profile has photo, birthday, gender, CPF, address and separate analytics consent',()=>{
 const account=src('pages/Account.tsx');
 assert.match(account,/birth_date/);
 assert.match(account,/gender_identity/);
 assert.match(account,/demographic_consent/);
 assert.match(account,/cpf/);
 assert.match(account,/postal_code/);
 assert.match(account,/address_line/);
 assert.match(account,/avatar_path/);
 assert.match(account,/customer-avatars/);
 assert.match(account,/VITE_AGADE_PROFILE_ENABLED/);
 assert.doesNotMatch(account,/Entrar com link por e-mail|Acessar sem senha|mode==="magic"/);
});

test('gender question requires an explicit response and supports diverse identities',()=>{
 const account=src('pages/Account.tsx');
 for(const value of ["cis_woman","cis_man","trans_woman","trans_man","travesti",
  "nonbinary","agender","genderfluid","bigender","genderqueer","self_described","prefer_not"]){
  assert.ok(account.includes('["'+value+'",'),"Missing gender option "+value);
 }
 assert.match(account,/Identidade de gênero \*/);
 assert.match(account,/<select required/);
 assert.match(account,/gender_self_description/);
 assert.match(account,/Selecione uma opção no campo de gênero/);
 assert.match(account,/demographic_consent/);
 assert.match(account,/Prefiro não declarar/);
 assert.doesNotMatch(account,/Nenhuma resposta de gênero é obrigatória/);
});

test('customer success requires confirmed row and a fresh read, scoped to auth user',()=>{
 const page=src('pages/Account.tsx');
 assert.match(page,/return=representation/);
 assert.match(page,/saved\.length!==1/);
 assert.match(page,/const persisted=await fetchCustomer\(\)/);
 assert.match(page,/persisted\.full_name!==customer\.full_name\.trim\(\)/);
 assert.match(page,/cache:"no-store"/);
 assert.match(page,/user_id:\`eq\.\$\{user\.id\}\`/);
});
