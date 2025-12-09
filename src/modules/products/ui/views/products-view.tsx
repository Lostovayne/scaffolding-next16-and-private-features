'use client';

import { useQueryState } from 'nuqs';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Props {
  products: Product[];
}

export function ProductsView({ products }: Props) {
  const [q, setQ] = useQueryState('q', { defaultValue: '' });
  // const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white/90">Products</h1>
        <div className="flex gap-2">
          <input 
            type="search"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            <div className="aspect-square bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 group-hover:scale-105 transition-transform" />
            <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
            <p className="text-white/60 text-sm mb-4">{p.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-400">${p.price}</span>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
         <div className="text-center py-20 text-white/40">
           No products found matching your search.
         </div>
      )}
    </div>
  );
}

export function ProductsViewLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-48 bg-white/10 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-4/5 bg-white/5 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function ProductsViewError() {
    return (
        <div className="p-10 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-center">
            <h3 className="text-xl font-bold mb-2">Error Loading Products</h3>
            <p>Something went wrong while fetching the data. Please try again.</p>
        </div>
    )
}
