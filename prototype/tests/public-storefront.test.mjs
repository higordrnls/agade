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
 assert.match(page,/auth\/v1\/otp/);
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
