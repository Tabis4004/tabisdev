import { products } from "@/data/portfolio";
import { ProductShowcase } from "./ProductShowcase";

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-white/60 py-20 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-violet-600">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Nos{" "}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
              produits
            </span>{" "}
            en action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Découvrez les interfaces de chaque application — transport, gestion
            commerciale et paiements mobiles.
          </p>
        </div>

        <div className="space-y-10">
          {products.map((product, index) => (
            <ProductShowcase
              key={product.name}
              product={product}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
