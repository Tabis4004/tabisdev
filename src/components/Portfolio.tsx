import { products } from "@/data/portfolio";
import { ProductShowcase } from "./ProductShowcase";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-pink-400">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Nos{" "}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              produits
            </span>{" "}
            en action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
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
