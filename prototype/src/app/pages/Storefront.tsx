import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, SlidersHorizontal } from "lucide-react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

const eyebrow = "text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium";

export default function Storefront() {
  const [state, setState] = useState<StorefrontState>({ status: "unconfigured", products: [] });
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("editorial");

  useEffect(() => {
    let active = true;
    loadStorefrontCatalog().then((result) => {
      if (active) {
        setState(result);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const products = useMemo(() => {
    const entries = [...state.products];
    const price = (product: typeof entries[number]) => Math.min(...product.variants.map(v => v.price_cents));
    if (sort === "price-asc") entries.sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") entries.sort((a, b) => price(b) - price(a));
    return entries;
  }, [state.products, sort]);

  return (
    <div className="bg-[#f3efe7] text-[#282720] min-h-screen">
      <header className="relative overflow-hidden min-h-[520px] md:min-h-[630px] bg-[#454d43] text-[#f5f0e6] px-6 md:px-12 flex flex-col justify-between">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: "radial-gradient(ellipse at 88% 15%, #828678 0%, transparent 45%), linear-gradient(135deg, #242e2a 6%, #495248 70%, #7b776b)",
        }}/>
        <div className="relative flex justify-between pt-8">
          <span className={eyebrow}>AGADE / Edição 001</span>
          <span className={eyebrow}>Óculos solares / Curadoria</span>
        </div>
        <div className="relative max-w-[1450px] w-full mx-auto py-20 md:py-24">
          <p className={eyebrow + " text-[#d0d1c5] mb-5"}>Uma seleção para olhar de outro jeito</p>
          <h1 className="text-[clamp(5rem,13vw,13rem)] leading-[0.9] tracking-[-0.065em] font-normal max-w-6xl" style={{ fontFamily: "var(--font-serif)" }}>
            Objetos<br/>de <em>olhar.</em>
          </h1>
          <div className="mt-11 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-sm text-base leading-relaxed text-[#e1e2d7]">
              Peças escolhidas pelo encontro entre forma, expressão e cotidiano. A primeira curadoria comercial está em preparação.
            </p>
            <a href="#selecao" className="group flex items-center gap-5 text-xs uppercase tracking-[0.2em] border-b border-[#d9dbd0] pb-3 w-fit">
              Conheça a seleção <ArrowDown size={19} className="group-hover:translate-y-1 transition-transform" aria-hidden="true"/>
            </a>
          </div>
        </div>
        <div className="relative py-5 border-t border-white/25 flex justify-between">
          <span className={eyebrow}>Editorial / AGADE</span>
          <span className={eyebrow}>Uberlândia, Brasil</span>
        </div>
      </header>

      <section id="selecao" className="max-w-[1500px] mx-auto px-6 md:px-12 py-16 md:py-24" aria-busy={loading}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 border-b border-[#282720]/25 pb-8 mb-12">
          <div>
            <p className={eyebrow + " text-[#69675e] mb-4"}>Seleção / 01</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-[-0.04em] font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              A coleção <em>em foco.</em>
            </h2>
          </div>
          {!loading && state.status === "ready" && products.length > 0 && (
            <div className="flex items-center gap-3 text-xs">
              <SlidersHorizontal size={16} aria-hidden="true"/>
              <label htmlFor="sort-products" className="text-xs">Ordenar por</label>
              <select id="sort-products" value={sort} onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-b border-[#282720] py-2 pr-3 focus-visible:outline-offset-2">
                <option value="editorial">Curadoria</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </div>
          )}
        </div>

        {loading && <p role="status" className="text-[#69675e] py-20 text-lg">Preparando a seleção…</p>}

        {!loading && state.status === "error" && (
          <div className="border-t border-[#282720]/20 py-16" role="alert">
            <h3 className="text-3xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>Não foi possível abrir a seleção.</h3>
            <p className="text-[#69675e]">Estamos com uma indisponibilidade temporária. Tente novamente mais tarde.</p>
          </div>
        )}

        {!loading && (state.status === "unconfigured" || (state.status === "ready" && products.length === 0)) && (
          <div className="grid md:grid-cols-12 border-t border-[#282720]/20 min-h-[390px]">
            <div className="md:col-span-7 flex flex-col justify-between py-12 pr-8">
              <span className={eyebrow}>Primeira edição / Em preparação</span>
              <h3 className="text-[clamp(3.5rem,7vw,7.5rem)] tracking-[-0.06em] leading-[1.02] mt-10" style={{ fontFamily: "var(--font-serif)" }}>
                A espera também<br/>faz parte do <em>olhar.</em>
              </h3>
              <p className="max-w-md mt-9 leading-relaxed text-[#625f55]">
                Estamos finalizando a seleção de modelos e a apresentação de cada peça. Nada de produtos fictícios, estoque inventado ou promessas antes da hora.
              </p>
            </div>
            <div className="md:col-span-5 min-h-[310px] bg-[#d9d0c2] relative overflow-hidden flex items-center justify-center">
              <span className="text-[clamp(10rem,22vw,21rem)] italic leading-none opacity-35" style={{ fontFamily: "var(--font-serif)" }} aria-hidden="true">a.</span>
              <span className={eyebrow + " absolute bottom-6 left-6"}>Estudo de forma / 001</span>
            </div>
          </div>
        )}

        {!loading && state.status === "ready" && products.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14" aria-label="Produtos disponíveis">
            {products.map((product, index) => {
              const startingPrice = Math.min(...product.variants.map(v => v.price_cents));
              return (
                <article key={product.product_id} className="group">
                  <div className="relative aspect-[4/5] bg-[#ded8cc] flex items-center justify-center overflow-hidden">
                    {product.hero_image_url ? (
                      <img src={product.hero_image_url} alt={`Óculos ${product.name}`}
                        className="w-full h-full object-contain group-hover:scale-[1.025] transition-transform duration-500"
                        loading="lazy" decoding="async"/>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4 text-[#777065]">
                        <span className="text-7xl italic" style={{ fontFamily: "var(--font-serif)" }} aria-hidden="true">a.</span>
                        <span className={eyebrow}>Imagem em preparação</span>
                      </div>
                    )}
                    <span className={eyebrow + " absolute left-5 top-5 bg-[#f3efe7] px-3 py-2"}>{String(index + 1).padStart(2, "0")} / Seleção</span>
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-5">
                    <div>
                      {product.collection_name && <p className={eyebrow + " text-[#787267] mb-2"}>{product.collection_name}</p>}
                      <h3 className="text-3xl md:text-4xl tracking-[-0.03em]" style={{ fontFamily: "var(--font-serif)" }}>{product.name}</h3>
                    </div>
                    <p className="shrink-0 text-sm pt-2">Desde {money(startingPrice)}</p>
                  </div>
                  {product.editorial_description && <p className="text-sm leading-relaxed text-[#68645b] mt-4">{product.editorial_description}</p>}
                  <ul className="mt-5 pt-4 border-t border-[#282720]/20 space-y-2 text-sm" aria-label={`Variações disponíveis de ${product.name}`}>
                    {product.variants.map(v => <li key={v.variant_id} className="flex justify-between gap-4">
                      <span>{v.color_name} · {v.lens_type}</span><span>{money(v.price_cents)}</span>
                    </li>)}
                  </ul>
                  <p className={eyebrow + " mt-5 text-[#777267]"}>Checkout em desenvolvimento</p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-[#ddd5c8] px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1450px] mx-auto grid md:grid-cols-12 gap-8">
          <p className={eyebrow + " md:col-span-3"}>Notas de curadoria / 001</p>
          <div className="md:col-span-9">
            <h2 className="text-[clamp(2.6rem,5.5vw,6rem)] leading-[1.05] tracking-[-0.04em]" style={{ fontFamily: "var(--font-serif)" }}>
              Não é só sobre o que você vê. É sobre <em>como</em> você se vê.
            </h2>
            <p className="mt-7 max-w-xl leading-relaxed text-[#605b52]">Na AGADE, cada modelo terá sua própria apresentação editorial e informações verificadas antes de ser disponibilizado para compra.</p>
            <a href="#selecao" className="inline-flex gap-4 items-center border-b border-[#282720] mt-9 pb-3 text-xs uppercase tracking-[0.2em]">Voltar à seleção <ArrowRight size={17} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
    </div>
  );
}
