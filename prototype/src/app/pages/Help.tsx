import { Link } from "react-router";
import { ArrowRight, HelpCircle, Package, ShieldCheck, Truck, Mail } from "lucide-react";

const faqs=[
 {q:"Os produtos da AGADE já estão disponíveis para compra?",a:"Ainda não. Estamos preparando a primeira seleção comercial e finalizando o checkout. A disponibilidade aparecerá na página de cada modelo quando a operação estiver pronta."},
 {q:"Como saber se um modelo tem proteção UV?",a:"Cada página de produto mostrará a informação de proteção UV declarada para aquela variação, quando houver documentação correspondente. A AGADE não apresenta certificações ou resultados de ensaio que ainda não tenha verificado."},
 {q:"Como funciona o frete?",a:"O frete de entrega será pago pelo cliente, com valor e prazo calculados antes da compra. Não anunciamos frete grátis."},
 {q:"Quais serão as formas de pagamento?",a:"Estamos testando o Mercado Pago e pretendemos oferecer parcelamento. A quantidade de parcelas, taxas e valor final serão apresentados antes da confirmação do pedido."},
 {q:"Como funcionam trocas e devoluções?",a:"Nas compras online, o CDC assegura 7 dias para arrependimento, com devolução integral dos valores pagos. Para vícios em produtos duráveis, o prazo legal de reclamação é de 90 dias. Consulte nossa política detalhada em /politicas."},
 {q:"Posso acompanhar meu pedido pela conta?",a:"A área de acesso por e-mail está sendo preparada. O acompanhamento de pedidos será habilitado somente depois de conectado ao processamento de compras."}
];
export default function Help(){
 return <div className="bg-[#fffaf2] min-h-screen text-[#24372d]">
  <header className="bg-[#f0dfcf] px-6 sm:px-10 py-16 md:py-24">
   <div className="max-w-[1440px] mx-auto">
    <p className="text-xs text-[#a95e46] tracking-[.2em] uppercase mb-6 font-semibold">AGADE / ATENDIMENTO</p>
    <h1 className="text-5xl sm:text-7xl tracking-[-.05em]" style={{fontFamily:"var(--font-serif)"}}>Tudo às claras.</h1>
    <p className="text-[#555] leading-relaxed mt-6 max-w-2xl">Informação sobre produtos, compras e atendimento. Estamos preparando a abertura da loja — algumas funções ainda não estão disponíveis.</p>
   </div>
  </header>
  <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-16 md:py-24">
   <section aria-label="Como será comprar na AGADE" className="grid md:grid-cols-3 gap-5 mb-20">
    {[{Icon:ShieldCheck,title:"Informação verificável",body:"Dados técnicos específicos do produto, sem certificações inventadas."},
      {Icon:Truck,title:"Entrega transparente",body:"Prazos e valores serão apresentados antes de qualquer cobrança."},
      {Icon:Package,title:"Pedido acompanhado",body:"O acesso a pedidos será liberado junto com o checkout."}
     ].map(({Icon,title,body})=><div key={title} className="p-7 bg-[#f4eee2]">
      <Icon className="text-[#102e90] mb-5" size={27}/><h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-sm leading-relaxed text-[#555]">{body}</p></div>)}
   </section>
   <section className="grid lg:grid-cols-12 gap-10" aria-labelledby="faq-title">
    <div className="lg:col-span-4"><p className="text-xs uppercase tracking-[.2em] text-[#102e90] mb-5">DÚVIDAS FREQUENTES</p>
     <h2 id="faq-title" className="text-4xl sm:text-5xl" style={{fontFamily:"var(--font-serif)"}}>Quer saber mais?</h2>
     <p className="text-sm leading-relaxed text-[#666] mt-6 max-w-xs">Reunimos respostas para ajudar você a conhecer a AGADE enquanto preparamos as primeiras vendas.</p>
    </div>
    <div className="lg:col-span-8 border-t border-black/20">
     {faqs.map(({q,a})=><details key={q} className="group border-b border-black/20 py-6">
      <summary className="cursor-pointer list-none flex justify-between items-start gap-5 text-lg font-medium focus-visible:outline-2">
       {q}<HelpCircle size={18} className="shrink-0 mt-1 text-[#102e90]"/>
      </summary><p className="text-[#555] mt-4 max-w-2xl leading-relaxed text-sm">{a}</p>
     </details>)}
    </div>
   </section>
   <div className="mt-14 flex flex-wrap gap-5 text-sm"><Link className="underline underline-offset-4" to="/politicas">Leia a política completa de trocas e devoluções</Link><a className="inline-flex items-center gap-2 underline underline-offset-4" href="mailto:atendimento@agade.com"><Mail size={17}/> atendimento@agade.com</a></div>
   <div className="mt-20 bg-[#a95e46] text-white p-10 sm:p-14 flex flex-col md:flex-row justify-between gap-8 md:items-end">
    <div><p className="text-xs uppercase tracking-[.2em] text-white/70 mb-6">PRECISA EXPLORAR MAIS?</p>
      <h2 className="text-3xl sm:text-5xl" style={{fontFamily:"var(--font-serif)"}}>Conheça a seleção.</h2></div>
    <Link to="/loja" className="inline-flex gap-4 border-b border-white pb-3 self-start md:self-end uppercase tracking-[.16em] text-xs">Óculos de sol <ArrowRight size={17}/></Link>
   </div>
  </div>
 </div>;
}