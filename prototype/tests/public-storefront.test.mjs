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
 assert.match(src('pages/Storefront.tsx'),/Compra online em preparação/);
 assert.match(src('pages/Home.tsx'),/loadStorefrontCatalog/);
});
