import type { CatalogProduct } from './catalog';

export type StorefrontVariant = {
  variant_id: string;
  sku: string;
  color_name: string;
  lens_type: string;
  uv_claim: string | null;
  polarized_claim: boolean | null;
  size_description: string | null;
  weight_grams: number | null;
  price_cents: number;
  sellable_stock: number;
};

export type StorefrontProduct = {
  product_id: string;
  slug: string;
  name: string;
  editorial_description: string;
  technical_description: string;
  collection_name: string | null;
  hero_image_url: string | null;
  variants: StorefrontVariant[];
};

export type StorefrontState =
  | { status: 'unconfigured'; products: StorefrontProduct[] }
  | { status: 'ready'; products: StorefrontProduct[] }
  | { status: 'error'; products: StorefrontProduct[]; message: string };

type CatalogRow = Omit<StorefrontVariant, never> & Omit<StorefrontProduct, 'variants'>;

export function groupCatalog(rows: CatalogRow[]): StorefrontProduct[] {
  const map = new Map<string, StorefrontProduct>();
  for (const row of rows) {
    if (!map.has(row.product_id)) {
      map.set(row.product_id, {
        product_id: row.product_id,
        slug: row.slug,
        name: row.name,
        editorial_description: row.editorial_description,
        technical_description: row.technical_description,
        collection_name: row.collection_name,
        hero_image_url: row.hero_image_url,
        variants: [],
      });
    }
    map.get(row.product_id)!.variants.push({
      variant_id: row.variant_id, sku: row.sku, color_name: row.color_name,
      lens_type: row.lens_type, uv_claim: row.uv_claim,
      polarized_claim: row.polarized_claim, size_description: row.size_description,
      weight_grams: row.weight_grams, price_cents: row.price_cents,
      sellable_stock: row.sellable_stock,
    });
  }
  return [...map.values()];
}

/** Não retorna produtos fictícios caso a operação comercial ainda não esteja configurada. */
export async function loadStorefrontCatalog(): Promise<StorefrontState> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)) return { status: 'unconfigured', products: [] };
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/list_storefront_catalog`, {
      method: 'POST',
      headers: {
        apikey: anonKey,
        ...(anonKey.startsWith('eyJ') ? { Authorization: `Bearer ${anonKey}` } : {}),
        'Content-Type': 'application/json',
      },
      body: '{}',
    });
    if (!response.ok) throw new Error(`Catálogo indisponível (HTTP ${response.status})`);
    const rows: CatalogRow[] = await response.json();
    return { status: 'ready', products: groupCatalog(rows) };
  } catch {
    return { status: 'error', products: [], message: 'Não foi possível consultar o catálogo no momento.' };
  }
}

// O acervo conceitual permanece em ./catalog.ts e não é transformado em mercadoria.
export type LegacyConceptualCatalog = CatalogProduct[];
