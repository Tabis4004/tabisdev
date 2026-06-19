import { getHeroStats, getProducts, getSiteContent } from "@/lib/content";
import { IconArrow } from "./icons";

export function Hero() {
  const { hero } = getSiteContent();
  const products = getProducts();
  const stats = getHeroStats();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full bg-sky-300/50 blur-[100px]" />
        <div className="absolute top-10 right-1/4 h-[380px] w-[380px] rounded-full bg-violet-300/45 blur-[90px]" />
        <div className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-emerald-300/40 blur-[90px]" />
        <div className="absolute top-1/2 right-0 h-[240px] w-[240px] rounded-full bg-amber-300/45 blur-[70px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {hero.badge}
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl md:leading-[1.1]">
          {hero.titleBefore}{" "}
          <span className="bg-gradient-to-r from-teal-600 via-violet-600 to-amber-500 bg-clip-text text-transparent">
            {hero.titleHighlight}
          </span>{" "}
          {hero.titleAfter}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          {hero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {products.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`,
                boxShadow: `0 4px 16px ${p.accent}44`,
              }}
            >
              {p.name}
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl"
          >
            Découvrir le portfolio
            <IconArrow className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50"
          >
            Nous contacter
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-slate-200/80 pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold md:text-3xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
