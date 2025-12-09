# Next.js 16 Scaffolding (Architecture Features)

This project implements a robust architecture designed for Scale, Performance (PPR), and Developer Experience, leveraging the latest **Next.js 16 features**.

## 🏗️ Core Architecture Concepts

### 1. Nuqs (Type-Safe Search Params)

We use `nuqs` to use the **URL as the Source of Truth** for state management. This ensures deep linking support, type safety, and seamless Server/Client synchronization.

**The Data Flow:**

1.  **The Trigger (Client Side)**:

    - `useQueryState('q')` updates the URL URL immediately (`/products?q=Macbook`).
    - Triggers a Next.js Router transition, requesting new Server Components.

2.  **The Hand-off (Next.js Router)**:

    - `Page.tsx` receives `searchParams` as a **Promise** (Next.js 16 standard).
    - **Rule**: The Page never awaits. It passes the promise directly to the Logic Layer (PPR Optimization).

3.  **The Checkpoint (Parsing & Validation)**:

    - `loadSearchParams.parse(searchParams)` intercepts the raw promise.
    - **Validation**: Checks against the schema defined in `params.ts`.
    - **Defaults**: Automatically applies default values (e.g., `page=1`) if params are missing or invalid.
    - **Cache**: Memoizes the parsed result for the duration of the request.

4.  **The Consumption (Safe Usage)**:
    - The Logic Component receives a guaranteed, type-safe object (`{ q: string, page: number }`).
    - This object is used to fetch data safely from the DB/API without fear of `undefined` or injection.

### 2. Architecture Layers

- **Layer 1 (Static Shell)**: `page.tsx` - Immediate render, 0 blocking.
- **Layer 2 (Logic Component)**: `*_data.tsx` - Handles Async (Auth, DB, Params).
- **Layer 3 (View Component)**: `*_view.tsx` - Pure UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Nuqs Documentation](https://nuqs.47ng.com/) - learn about Type-safe search params.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
