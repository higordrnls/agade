import { Link } from "react-router";
import { ArrowRight, Mail } from "lucide-react";

const paragraphs=[
 {heading:"Quais informações podemos receber?",body:"No estágio atual, o site permite navegar pela seleção, armazenar itens de interesse no próprio navegador e acessar páginas informativas. A conta permite autenticação por e-mail e senha, ou por link de acesso, conforme configuração do serviço. O cliente pode preencher uma ficha privada com nome, celular, data de nascimento, identidade de gênero, foto de perfil, CPF e endereço. Esses campos são voluntários nesta etapa. O cadastro de compra e o checkout ainda não estão ativos. A newsletter depende de configuração específica e pode estar desativada. Ao entrar em contato por e-mail, recebemos as informações incluídas voluntariamente na mensagem."},
 {heading:"Para que utilizamos os dados?",body:"Dados de contato são utilizados para responder solicitações. Quando a autenticação estiver ativa, o e-mail servirá para identificar a conta, enviar confirmações, recuperar senhas e, quando solicitado, enviar links de acesso. Nome e celular servem à identificação e ao futuro atendimento comercial. CPF e endereço, quando fornecidos, são reservados à preparação de futuros processos de compra e entrega; não são usados para traçar perfis demográficos. A ficha exige escolher uma resposta sobre identidade de gênero, inclusive a possibilidade de não declarar; opções de autodescrição também estão disponíveis. Isso não obriga a revelar uma identidade. Data de nascimento e identidade de gênero só podem compor análises estatísticas internas agregadas com autorização específica, revogável no perfil. A foto de perfil é opcional e não serve a reconhecimento facial. O consentimento para newsletter, quando o recurso for habilitado, será separado da criação da conta."},
 {heading:"Onde ficam os dados?",body:"A sacola de seleção utiliza o armazenamento local do navegador. Dados de autenticação e perfis, quando habilitados, são processados na infraestrutura Supabase. A senha é gerenciada pelo serviço de autenticação e não é armazenada no perfil comercial. A foto fica em armazenamento privado, acessível apenas ao titular autenticado e a serviços administrativos autorizados. Dados cadastrais e de endereço são protegidos por controles de acesso individuais. Inscrições para novidades são separadas. Pagamentos, quando liberados, envolverão o Mercado Pago, com informações próprias de privacidade disponíveis no serviço."},
 {heading:"Cookies e métricas",body:"Ainda não declaramos uma configuração definitiva de publicidade ou análise de comportamento. Antes de ativar ferramentas opcionais de rastreamento e marketing, documentaremos seus fornecedores e mecanismos de consentimento quando exigíveis."},
 {heading:"Seus direitos",body:"Você pode solicitar informações sobre tratamento de dados, correções, acesso e exclusão quando aplicável, ou retirar consentimentos de marketing. Envie a solicitação para atendimento@agade.com. Os direitos observam a Lei Geral de Proteção de Dados Pessoais."},
 {heading:"Atualizações",body:"Esta página descreve a estrutura atual, ainda em preparação. Antes de iniciar vendas, publicaremos a identificação do responsável pelo tratamento, bases legais, prazos de retenção e canais definitivos conforme os processos realmente ativados."}
];
export default function Privacy(){
 return <div className="min-h-screen bg-[#fffaf2] text-[#24372d]">
  <header className="bg-[#f0dfcf] text-[#24372d] px-6 sm:px-12 py-20 md:py-28">
   <div className="max-w-[1440px] mx-auto"><p className="text-xs uppercase tracking-[.22em] mb-8">AGADE / PRIVACIDADE</p>
    <h1 className="text-5xl sm:text-7xl max-w-4xl leading-[1.05] tracking-tight" style={{fontFamily:"var(--font-serif)"}}>Sua privacidade faz parte do cuidado.</h1>
    <p className="mt-6 max-w-xl leading-relaxed">Informações sobre como tratamos dados pessoais nesta fase de preparação da loja.</p>
   </div>
  </header>
  <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-20 grid lg:grid-cols-12 gap-12">
   <aside className="lg:col-span-4"><p className="text-xs tracking-[.2em] uppercase text-[#a54f39] mb-5">INFORMAÇÃO TRANSPARENTE</p>
    <h2 className="text-3xl sm:text-4xl" style={{fontFamily:"var(--font-serif)"}}>Clareza em cada etapa.</h2>
    <p className="text-sm text-[#664f42] mt-6 leading-relaxed">Nossa operação ainda está sendo estruturada. Por isso, os serviços ainda não habilitados são descritos como futuros, sem simular tratamentos de dados que não ocorreram.</p>
   </aside>
   <div className="lg:col-span-8 border-t border-[#a54f39]/25">
    {paragraphs.map(x=><section key={x.heading} className="py-7 border-b border-[#a54f39]/25">
     <h2 className="text-2xl sm:text-3xl mb-5" style={{fontFamily:"var(--font-serif)"}}>{x.heading}</h2><p className="text-[#664f42] leading-relaxed">{x.body}</p>
    </section>)}
    <div className="bg-[#eef0e7] p-7 sm:p-10 mt-12">
     <p className="text-xs uppercase tracking-[.2em] mb-5 text-[#a54f39]">FALE CONOSCO</p>
     <a className="inline-flex items-center gap-2 underline underline-offset-4 break-all" href="mailto:atendimento@agade.com"><Mail size={18}/>atendimento@agade.com</a>
     <p className="text-xs text-[#664f42] mt-5">Política informativa em elaboração; os dados legais completos serão publicados antes da operação de vendas.</p>
    </div>
    <Link to="/politicas" className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[.15em] border-b border-[#3c271f] pb-2">Trocas e devoluções <ArrowRight size={17}/></Link>
   </div>
  </div>
 </div>;
}