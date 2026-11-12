import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const photo=(id:number,w:number=1200)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const serif={fontFamily:"var(--font-serif)"};
export default function About(){
 return <div className="bg-[var(--agade-page)] text-[var(--agade-ink)]">
  <section className="grid lg:grid-cols-[.9fr_1.1fr] bg-[var(--agade-feature)]">
   <div className="flex flex-col justify-between p-6 sm:p-12 lg:pl-[max(3rem,calc((100vw-1450px)/2))] py-12 lg:py-20">
    <p className="text-xs tracking-[.2em] uppercase font-semibold text-[var(--agade-accent-text)]">AGADE / A MARCA</p>
    <div className="my-14 lg:my-10">
     <h1 className="text-[clamp(4.2rem,8vw,9rem)] tracking-[-.07em] leading-[.89]" style={serif}>O olhar<br/><em className="text-[var(--agade-accent-text)]">é seu.</em></h1>
     <p className="max-w-md mt-8 text-lg leading-relaxed text-[var(--agade-muted)]">Estamos montando uma marca de óculos de sol do nosso jeito. Ainda no começo, com muitas referências na cabeça e a primeira seleção sendo escolhida.</p>
    </div>
    <p className="text-[11px] tracking-[.18em] uppercase text-[var(--agade-muted)]">POR ENQUANTO, TUDO COMEÇA COM UMA BOA ESCOLHA</p>
   </div>
   <div className="relative min-h-[470px] lg:min-h-[700px] overflow-hidden bg-[var(--agade-leaf)]">
    <img src={photo(9485735,1500)} alt="Fotografia editorial ilustrativa de pessoa com óculos e roupas coloridas cercada por vegetação" className="absolute inset-0 w-full h-full object-cover" />
    <span className="absolute bottom-5 right-5 bg-[var(--agade-page)]/95 text-[var(--agade-ink)] rounded-full px-4 py-2 text-[10px] uppercase tracking-widest">Referência visual · Pexels</span>
   </div>
  </section>
  <section className="max-w-[1450px] mx-auto px-6 sm:px-12 py-20 lg:py-32 grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-24 items-center">
   <figure className="relative">
    <img src={photo(37428896)} alt="Sombra de folhas tropicais projetada em parede de barro terracota" loading="lazy" className="w-full max-h-[730px] aspect-[4/5] object-cover rounded-[22px]"/>
    <figcaption className="mt-3 text-xs text-[var(--agade-muted)]">Textura e luz: estudo de linguagem visual</figcaption>
   </figure>
   <div>
    <p className="text-xs tracking-[.2em] uppercase text-[var(--agade-accent-text)] font-semibold mb-6">UM JEITO BRASILEIRO DE VER</p>
    <h2 className="text-[clamp(3rem,5.5vw,6rem)] leading-[1.02] tracking-[-.055em]" style={serif}>A gente repara nas <em>pequenas coisas.</em></h2>
    <div className="grid sm:grid-cols-2 gap-7 mt-10 leading-relaxed text-[var(--agade-muted)]">
     <p>A AGADE é uma marca independente de curadoria de óculos solares, com uma perspectiva brasileira. Estamos construindo nossa primeira seleção de peças para acompanhar diferentes estilos e rotinas.</p>
     <p>Ainda temos muito para construir. O que já sabemos é que queremos mostrar os produtos como eles realmente são, com boas fotos, medidas e informações sobre as lentes — sem promessas vazias.</p>
    </div>
    <Link to="/loja" className="mt-10 inline-flex min-h-12 items-center justify-between gap-7 px-6 py-3 rounded-full bg-[var(--agade-accent)] text-white text-sm hover:bg-[var(--agade-accent)] transition-colors">Conheça a seleção <ArrowUpRight size={19}/></Link>
   </div>
  </section>
  <section className="grid md:grid-cols-2 bg-[var(--agade-feature)]">
   <div className="min-h-[370px] md:min-h-[530px] overflow-hidden">
    <img src={photo(3803484,1300)} alt="Estudo visual de moda e arquitetura: retrato com óculos em ambiente urbano brasileiro" loading="lazy" className="w-full h-full object-cover"/>
   </div>
   <div className="px-8 sm:px-12 lg:px-20 py-16 md:py-24 flex flex-col justify-center items-start">
    <p className="text-xs uppercase tracking-[.2em] text-[var(--agade-accent-text)] mb-6 font-semibold">EXPRESSÃO EM MOVIMENTO</p>
    <h2 className="text-[clamp(3.1rem,5.6vw,6.2rem)] leading-[1.02] tracking-[-.05em]" style={serif}>Um par de óculos.<br/><em>Muitos jeitos de usar.</em></h2>
    <p className="text-[var(--agade-muted)] leading-relaxed mt-8 mb-9 max-w-md">Não existe uma armação certa para todo mundo. Queremos encontrar modelos que deem vontade de experimentar e levar para a vida real.</p>
    <Link to="/guia" className="inline-flex items-center gap-3 min-h-12 text-sm border-b border-[var(--agade-accent)] text-[var(--agade-accent-text)]">Descubra nosso guia <ArrowUpRight size={18}/></Link>
   </div>
  </section>
  <p className="px-6 sm:px-12 py-4 text-xs leading-relaxed text-[var(--agade-muted)]">Fotografias ilustrativas licenciadas via Pexels. Pessoas retratadas não possuem vínculo com a AGADE; não representam campanhas ou produtos comerciais da marca.</p>
 </div>;
}