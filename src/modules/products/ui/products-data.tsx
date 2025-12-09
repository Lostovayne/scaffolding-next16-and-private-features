import { type SearchParams } from "nuqs/server";
import { loadSearchParams } from "../params";
import { getProducts } from "../server/procedures";
import { ProductsView } from "./views/products-view";

interface Props {
  searchParams: Promise<SearchParams>;
}

// 2. Logic Component (Layer 2)
// Handles all async logic: Params, Auth (if needed), Data Fetching
export async function ProductsData({ searchParams }: Props) {
  // A. Parse Params safely (awaitable)
  const params = await loadSearchParams.parse(searchParams);

  // B. Fetch Data
  // In a real app we might use prefetchQuery here if using React Query
  // For simplicity we fetch directly for Server Component props
  const products = await getProducts(params);

  return (
    // Pass strictly typed data to View
    <ProductsView products={products} />
  );
}
