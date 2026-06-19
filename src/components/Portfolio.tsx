import { getProducts, getSiteContent } from "@/lib/content";
import { ProductShowcase } from "./ProductShowcase";

export function Portfolio() {
  const { portfolio } = getSiteContent();
  const products = getProducts();

  return (
    <section id="portfolio" className="bg-white/60 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {portfolio.titleBefore}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              {portfolio.titleHighlight}
            </span>{" "}
            {portfolio.titleAfter}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            {portfolio.subtitle}
          </p>
        </div>

        <div className="space-y-10">
          {products.map((product, index) => (
            <ProductShowcase
              key={product.id}
              product={product}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
