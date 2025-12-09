import { ProductsData } from "@/modules/products/ui/products-data";
import { ProductsViewError, ProductsViewLoading } from "@/modules/products/ui/views/products-view";
import { type SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
}

// 1. Static Shell (Layer 1)
// - NO await here (PPR Safe)
// - Wraps Logic in Suspense + ErrorBoundary
export default function ProductsPage({ searchParams }: Props) {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <Suspense fallback={<ProductsViewLoading />}>
        <ErrorBoundary fallback={<ProductsViewError />}>
          <ProductsData searchParams={searchParams} />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
