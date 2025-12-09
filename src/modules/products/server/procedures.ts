import "server-only";

// Mock data fetching procedure
// In a real app, this would call your DB or API
export async function getProducts(params: { q: string; page: number }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const products = Array.from({ length: 8 }).map((_, i) => {
    const id = i + 1 + (params.page - 1) * 8;
    return {
      id,
      name: `Product ${id} ${params.q ? `(${params.q})` : ""}`,
      price: Math.floor(Math.random() * 1000) + 50,
      description: "High quality product satisfying Next.js 16 standards.",
    };
  });

  return products;
}
