import { Link } from "react-router";
import { ArrowRight, Eye, Ruler, ShieldCheck, Sun } from "lucide-react";

const topics=[
 {Icon:Eye,number:"01",title:"Forma e proporção",detail:"Observe o desenho da armação e como ele conversa com o seu estilo. As medidas do modelo ajudam a comparar opções além da fotografia."},
 {Icon:Ruler,number:"02",title:"Medidas e ajuste",detail:"Confira largura, ponte, comprimento das hastes e peso sempre que os dados estiverem disponíveis. Um modelo bonito também precisa ser confortável."},
 {Icon:Sun,number:"03",title:"Características das lentes",detail:"Cor, acabamento e polarização são informações diferentes. Polarização pode reduzir reflexos, mas não substitui a verificação de proteção UV."},
 {Icon:ShieldCheck,number:"04",title:"Proteção UV e documentação",detail:"Antes da compra, verifique as informações específicas do modelo. Alegações de proteção UV devem ter base documental; não confunda descrição comercial com laudo independente."},
];
export default function Guide(){
 return <div className="bg-white text-[#171717] min-h-screen">
  <section className="bg-[#102e90] text-white px-6 sm:px-10 py-20 md:py-28">
   <div className="max-w-[1450px] mx-auto">
    <p className="text-xs uppercase tracking-[.22em] text-white/75 mb-8">AGADE / GUIA DE ESCOLHA</p>
    <h1 className="text-[clamp(3.5rem,8vw,8rem)] max-w-5xl leading-[1] tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Olhe para os detalhes.</h1>
    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/90">Uma escolha de estilo também é uma escolha de conforto, informação e confiança. Este é nosso guia para conhecer melhor cada óculos.</p>
   </div>
  </section>
  <section className="max-w-[1450px] mx-auto px-6 sm:px-10 py-20 md:py-24" aria-label="O que observar ao escolher um óculos">
   <div className="grid md:grid-cols-2 gap-x-10 gap-y-12">
    {topics.map(({Icon,number,title,detail})=><article key={number} className="border-t border-black/20 pt-7">
     <div className="flex items-start justify-between mb-8"><span className="text-xs tracking-[.2em] text-[#102e90]">{number} / GUIA</span><Icon size={27} strokeWidth={1.5} aria-hidden="true"/></div>
     <h2 className="text-3xl sm:text-4xl mb-5 tracking-tight" style={{fontFamily:"var(--font-serif)"}}>{title}</h2>
     <p className="text-[#555] leading-relaxed max-w-md">{detail}</p>
    </article>)}
   </div>
  </section>
  <section className="bg-[#f3f4f8] px-6 sm:px-10 py-20">
   <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
    <div><p className="uppercase text-xs tracking-[.2em] text-[#102e90] mb-5">DA INFORMAÇÃO À ESCOLHA</p>
     <h2 className="text-3xl sm:text-5xl" style={{fontFamily:"var(--font-serif)"}}>Tudo começa pelo seu olhar.</h2>
     <p className="mt-6 max-w-2xl leading-relaxed text-[#555]">Nas páginas individuais exibimos apenas as características registradas para cada variação. Caso uma informação esteja ausente, não presumimos que o produto tenha aquela característica.</p>
    </div>
    <Link to="/loja" className="inline-flex gap-4 items-center shrink-0 text-xs uppercase tracking-[.16em] border-b border-black pb-3">Ver modelos <ArrowRight size={17}/></Link>
   </div>
  </section>
 </div>;
}