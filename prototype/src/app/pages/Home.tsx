import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowDownRight, ArrowRight, MoveUpRight } from "lucide-react";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

const eyebrow = "text-[10px] sm:text-xs uppercase tracking-[0.24em] font-medium";

export default function Home() {
  return (
    <div className="overflow-hidden bg-[#eeeae2] text-[#24231f]">
      <section className="relative isolate min-h-[calc(100svh-5rem)] border-b border-[#24231f]/20 flex flex-col">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: "radial-gradient(ellipse at 77% 45%, #d5caba 0, transparent 47%), radial-gradient(ellipse at 15% 0%, #f7f3eb 0, transparent 57%)",
        }} />
        <div className="relative flex justify-between items-start px-6 md:px-12 pt-9">
          <span className={eyebrow}>AGADE / EYEWEAR</span>
          <span className={eyebrow + " text-right"}>Uma perspectiva brasileira<br />Uberlândia · MG</span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center px-6 md:px-12 pt-16 pb-24">
          <motion.div {...reveal} className="max-w-[1500px] mx-auto w-full">
            <p className={eyebrow + " mb-7 text-[#716e65]"}>Óculos para quem vê de outro jeito — 001</p>
            <h1 className="font-normal leading-[0.86] tracking-[-0.065em] text-[clamp(5rem,15.7vw,16rem)]" style={{ fontFamily: "var(--font-serif)" }}>
              Outra<br /><span className="italic font-normal pl-[8vw]">forma</span> de<br />ver.
            </h1>
          </motion.div>
          <div className="max-w-[1500px] mx-auto w-full flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-12">
            <p className="text-base sm:text-lg leading-relaxed max-w-[355px]">
              Curadoria de óculos solares com personalidade. Formas que acompanham sua maneira de estar no mundo.
            </p>
            <Link to="/loja" className="group inline-flex items-center justify-between gap-14 bg-[#24231f] text-[#f4efe5] px-6 py-5 w-fit min-w-[230px] hover:bg-[#575042] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24231f]">
              <span className={eyebrow}>Explorar a seleção</span>
              <ArrowDownRight className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" size={22} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative border-t border-[#24231f]/20 flex justify-between px-6 md:px-12 py-4">
          <span className={eyebrow}>Curadoria independente</span>
          <span className={eyebrow}>Deslize para descobrir ↓</span>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-36 bg-[#e5dfd4]" aria-labelledby="perspectiva-title">
        <motion.div {...reveal} className="max-w-[1450px] mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <p className={eyebrow}>01 / Manifesto</p>
          </div>
          <div className="md:col-span-9">
            <h2 id="perspectiva-title" className="text-[clamp(2.6rem,6.2vw,7.8rem)] leading-[1.02] tracking-[-0.045em] font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              O acessório muda.<br />A <em>perspectiva</em> também.
            </h2>
            <div className="mt-12 grid sm:grid-cols-2 gap-10 max-w-3xl">
              <p className="text-base leading-relaxed">Acreditamos que escolher um óculos é escolher como você se apresenta. Sem exagero, sem fórmula pronta — com intenção.</p>
              <p className="text-base leading-relaxed text-[#625e56]">A AGADE nasce em Uberlândia, Minas Gerais, com um olhar independente para design, identidade e cotidiano.</p>
            </div>
            <Link to="/story" className="inline-flex items-center gap-3 mt-10 border-b border-[#24231f] pb-2 text-xs tracking-[0.18em] uppercase hover:gap-6 transition-all">
              Conhecer o projeto <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="grid lg:grid-cols-2 bg-[#262722] text-[#f0ede4]" aria-labelledby="selecao-title">
        <div className="min-h-[440px] md:min-h-[640px] flex flex-col justify-between p-8 md:p-14 lg:p-20">
          <div>
            <p className={eyebrow + " text-[#bdb8ae]"}>02 / Curadoria</p>
            <h2 id="selecao-title" className="text-[clamp(3.8rem,7.6vw,8.6rem)] tracking-[-0.06em] leading-[0.98] mt-16" style={{ fontFamily: "var(--font-serif)" }}>
              A forma<br />tem <em>voz.</em>
            </h2>
          </div>
          <div>
            <p className="max-w-sm text-[#c6c2b8] leading-relaxed mb-9">Uma seleção em construção. A primeira edição comercial será apresentada com imagens, informações e disponibilidade verificadas.</p>
            <Link to="/loja" className="inline-flex items-center gap-4 text-xs tracking-[0.2em] uppercase border-b border-[#e6e0d4] pb-3 hover:gap-7 transition-all">
              Ver seleção <MoveUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[430px] md:min-h-[640px] bg-[#a8a396] overflow-hidden">
          <div className="absolute inset-0 opacity-65" style={{
            background: "linear-gradient(138deg, #e5ddcf 2%, #7e8576 46%, #3e4943 100%)",
          }} aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center px-10 text-center" aria-hidden="true">
            <span className="text-[clamp(8rem,19vw,21rem)] italic text-[#eae6dc]/70 leading-none tracking-[-0.15em]" style={{ fontFamily: "var(--font-serif)" }}>a.</span>
          </div>
          <div className="absolute bottom-8 left-8 right-8 flex justify-between text-[#f7f4eb]">
            <span className={eyebrow}>Estudo de forma / AGADE</span>
            <span className={eyebrow}>001</span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-32 bg-[#f3efe7]">
        <div className="max-w-[1450px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#24231f]/20 pb-8">
            <div>
              <p className={eyebrow + " mb-5"}>03 / Laboratório de ideias</p>
              <h2 className="text-[clamp(2.7rem,5.8vw,6.5rem)] leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: "var(--font-serif)" }}>O que estamos <em>imaginando.</em></h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#6d695e]">Nossa pesquisa em fabricação digital e circularidade segue como projeto conceitual independente da seleção comercial.</p>
          </div>
          <Link to="/collection" className="group block relative min-h-[360px] md:h-[620px] overflow-hidden bg-[#393c37] text-white">
            <img src="/imagens/catalog/drop-01/05-horizonte.png" alt="Imagem de acervo conceitual da pesquisa AGADE em óculos" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:scale-[1.025] transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" aria-hidden="true" />
            <div className="relative z-10 h-full min-h-[360px] flex flex-col justify-between p-7 md:p-12">
              <span className={eyebrow}>Arquivo conceitual · Não disponível para compra</span>
              <div className="flex items-end justify-between gap-5">
                <div>
                  <span className={eyebrow + " text-white/70"}>Pesquisa / Forma / Futuro</span>
                  <h3 className="text-4xl md:text-7xl mt-3 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>Arquivo AGADE</h3>
                </div>
                <ArrowRight size={30} aria-hidden="true" className="shrink-0 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="bg-[#d5cfc3] px-6 md:px-12 py-20">
        <div className="max-w-[1450px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-8">
          <div>
            <p className={eyebrow + " mb-5"}>Próxima página / 004</p>
            <h2 className="text-[clamp(3rem,7vw,8rem)] leading-none tracking-[-0.05em]" style={{ fontFamily: "var(--font-serif)" }}>Olhe de <em>novo.</em></h2>
          </div>
          <Link to="/loja" className="inline-flex gap-8 justify-between items-center border-b border-[#24231f] pb-3 uppercase text-xs tracking-[0.2em] min-w-[235px] hover:gap-12 transition-all">
            Explorar AGADE <ArrowRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
