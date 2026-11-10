import { useEffect, useState } from "react";
import { loadStorefrontCatalog, type StorefrontState } from "../data/storefrontCatalog";

const money = (cents: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export default function Storefront() {
  const [state, setState] = useState<StorefrontState>({ status: "unconfigured", products: [] });
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen">
      <header className="bg-black text-white px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-5" style={{ fontFamily: "var(--font-mono)" }}>
            AGADE · Curadoria ocular
          </p>
          <h1 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: "var(--font-serif)" }}>Seleção AGADE</h1>
          <p className="text-lg text-white/75 max-w-xl">
            Uma seleção cuidadosa de formas, materiais e perspectivas. Novas peças serão apresentadas aqui.
          </p>
        </div>
      </header>

      <section className="px-6 py-20 max-w-7xl mx-auto" aria-busy={loading}>
        {loading && <p role="status" className="text-muted-foreground">Carregando seleção…</p>}
        {!loading && state.status === "unconfigured" && (
          <section className="max-w-2xl" role="status">
            <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>Nossa seleção está sendo preparada.</h2>
            <p className="text-muted-foreground">Em breve, os primeiros modelos da AGADE estarão disponíveis nesta página.</p>
          </section>
        )}
        {!loading && state.status === "error" && (
          <p role="alert">Não foi possível carregar a seleção agora. Tente novamente mais tarde.</p>
        )}
        {!loading && state.status === "ready" && state.products.length === 0 && (
          <section className="max-w-2xl" role="status">
            <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>Em curadoria</h2>
            <p className="text-muted-foreground">Estamos definindo os modelos que farão parte da primeira seleção.</p>
          </section>
        )}
        {!loading && state.status === "ready" && state.products.length > 0 && (
          <section aria-label="Produtos selecionados" className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {state.products.map((product) => {
              const startingPrice = Math.min(...product.variants.map((variant) => variant.price_cents));
              return (
                <article key={product.product_id} className="border border-black/10 bg-secondary/30">
                  <div className="aspect-[3/2] bg-neutral-100 flex items-center justify-center overflow-hidden">
                    {product.hero_image_url ? (
                      <img
                        src={product.hero_image_url}
                        alt={`Óculos ${product.name}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs uppercase tracking-widest text-neutral-500">Imagem em preparação</span>
                    )}
                  </div>
                  <div className="p-7">
                    {product.collection_name && (
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{product.collection_name}</p>
                    )}
                    <h2 className="text-3xl mb-3" style={{ fontFamily: "var(--font-serif)" }}>{product.name}</h2>
                    <p className="text-sm text-muted-foreground mb-5">{product.editorial_description}</p>
                    <p className="font-medium mb-4">A partir de {money(startingPrice)}</p>
                    <ul className="text-sm space-y-1" aria-label={`Variantes disponíveis de ${product.name}`}>
                      {product.variants.map((variant) => (
                        <li key={variant.variant_id}>
                          {variant.color_name} · {money(variant.price_cents)}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-xs text-muted-foreground">Compra online ainda não habilitada.</p>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
}
