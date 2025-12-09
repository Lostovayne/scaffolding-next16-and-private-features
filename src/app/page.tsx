import '@/app/globals.css';
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans) bg-zinc-950 text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Next.js 16 Scaffolding
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Example implementation of the <strong>Static Shell Pattern</strong>,{" "}
          <strong>Logic Extraction</strong>, and <strong>Modules Architecture</strong>.
        </p>
        
        <Link 
          href="/products"
          className="px-8 py-3 bg-white text-zinc-950 font-semibold rounded-full hover:scale-105 transition-transform"
        >
          View Products Demo
        </Link>
      </main>
    </div>
  );
}
