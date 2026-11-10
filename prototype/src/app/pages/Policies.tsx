import { Link } from "react-router";
import { ArrowRight, Mail, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const faq=[
 {title:"Arrependimento em compras online",text:"Você pode desistir de uma compra feita pela internet em até 7 dias corridos a partir do recebimento do produto ou da contratação, conforme o art. 49 do Código de Defesa do Consumidor. Não é necessário informar motivo. O exercício desse direito não pode gerar ônus, e os valores pagos serão restituídos, incluindo o frete original."},
 {title:"Como solicitar a devolução",text:"Quando a loja estiver operando, envie a solicitação para atendimento@agade.com informando o número do pedido e a intenção de exercer o direito de arrependimento. A AGADE confirmará o recebimento da solicitação e orientará a logística reversa sem cobrança ao consumidor no caso de arrependimento legal."},
 {title:"Problema ou defeito no produto",text:"Para óculos de sol, que são bens duráveis, o prazo legal para reclamar de vícios aparentes ou de fácil constatação é de 90 dias após a entrega (art. 26, II, CDC). Para vícios ocultos, o prazo começa quando o problema se manifesta. Os direitos legais não se restringem por esta política."},
 {title:"Trocas por preferência",text:"Trocas por cor ou preferência fora do direito de arrependimento não são uma obrigação geral do CDC. Condições comerciais adicionais, caso sejam oferecidas, serão informadas antes de qualquer pedido."},
 {title:"Frete, envio e custos",text:"O frete de entrega será pago pelo cliente e calculado conforme o endereço e a modalidade disponível, antes da confirmação de qualquer compra. Isso não elimina o direito à restituição integral no arrependimento legal nem a responsabilidade por problemas atribuíveis ao fornecedor."},
 {title:"Pagamento parcelado",text:"A AGADE pretende oferecer parcelamento por meio do provedor de pagamentos. Número de parcelas, eventuais juros e valor total serão mostrados antes da finalização. Nenhuma condição de parcelamento está ativa neste momento."},
];
export default function Policies(){
 return <div className="min-h-screen bg-[#fffaf2] text-[#24372d]">
  <section className="px-6 sm:px-12 pt-20 pb-16 bg-[#e5e9dc] text-[#24372d] relative overflow-hidden">
   <div aria-hidden="true" className="absolute -right-20 -top-24 w-[450px] h-[450px] rounded-full border-[55px] border-[#e9ad76]/40"/>
   <div className="relative max-w-[1440px] mx-auto">
    <p className="text-xs uppercase tracking-[.23em] mb-6">AGADE / TRANSPARÊNCIA</p>
    <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-[.95] max-w-4xl tracking-[-.055em]" style={{fontFamily:"var(--font-serif)"}}>Comprar com clareza também é estilo.</h1>
    <p className="max-w-2xl mt-8 text-base leading-relaxed">Política informativa de trocas, devoluções e direitos do consumidor. A loja ainda não está recebendo pedidos.</p>
   </div>
  </section>
  <section className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 md:py-24">
   <div className="grid md:grid-cols-3 gap-5 mb-20">
    {[{Icon:RotateCcw,title:"7 dias",text:"Direito de arrependimento nas compras realizadas à distância."},
    {Icon:ShieldCheck,title:"90 dias",text:"Prazo legal para reclamar de vícios aparentes em produtos duráveis."},
    {Icon:Truck,title:"Frete informado",text:"Entrega paga pelo cliente e valor apresentado antes da compra."}].map(({Icon,title,text})=><div key={title} className="border-t-2 border-[#56725b] pt-6">
     <Icon size={25} className="mb-6 text-[#24469a]" aria-hidden="true"/>
     <h2 className="text-3xl mb-4" style={{fontFamily:"var(--font-serif)"}}>{title}</h2><p className="text-sm leading-relaxed max-w-sm">{text}</p>
    </div>)}
   </div>
   <div className="grid lg:grid-cols-12 gap-10">
    <div className="lg:col-span-4"><p className="text-xs uppercase tracking-[.2em] text-[#a34d34] mb-5">INFORMAÇÕES ESSENCIAIS</p>
     <h2 className="text-4xl sm:text-5xl" style={{fontFamily:"var(--font-serif)"}}>Sem letra miúda.</h2>
     <p className="text-sm leading-relaxed mt-7 text-[#654e42]">Estas orientações seguem o CDC e o Decreto do Comércio Eletrônico. Antes das primeiras vendas, precisamos publicar os dados de identificação do fornecedor e concluir o fluxo operacional de atendimento e estorno.</p>
    </div>
    <div className="lg:col-span-8 border-t border-[#ad5b45]/35">{faq.map(item=><details key={item.title} className="border-b border-[#ad5b45]/30 py-6 group">
     <summary className="cursor-pointer list-none font-semibold text-lg focus-visible:outline-2 focus-visible:outline-[#ad5b45]">{item.title} <span className="float-right text-[#ad5b45] group-open:rotate-45 transition-transform">+</span></summary>
     <p className="mt-5 leading-relaxed max-w-3xl text-[#654e42]">{item.text}</p>
    </details>)}</div>
   </div>
   <div className="mt-20 bg-[#eef0e7] p-8 sm:p-12 flex flex-col sm:flex-row sm:justify-between gap-7">
    <div><p className="text-xs uppercase tracking-[.2em] text-[#a34d34] mb-4">FALE COM A GENTE</p>
     <h2 className="text-3xl sm:text-4xl mb-3" style={{fontFamily:"var(--font-serif)"}}>Atendimento humano.</h2>
     <p className="text-sm max-w-xl leading-relaxed">Para dúvidas sobre esta política e futuras compras, escreva para nosso atendimento. O canal de WhatsApp ainda está sendo preparado.</p>
    </div>
    <a href="mailto:atendimento@agade.com" className="self-start shrink-0 inline-flex items-center gap-3 border-b border-current pb-2 text-sm"><Mail size={18}/> atendimento@agade.com</a>
   </div>
   <div className="pt-12 flex flex-wrap justify-between items-center gap-5">
    <p className="text-xs text-[#654e42]">Referências: Lei nº 8.078/1990, arts. 18, 26 e 49; Decreto nº 7.962/2013.</p>
    <Link className="text-xs uppercase tracking-wider border-b border-current pb-2 inline-flex items-center gap-2" to="/ajuda">Central de ajuda <ArrowRight size={16}/></Link>
   </div>
  </section>
 </div>;
}