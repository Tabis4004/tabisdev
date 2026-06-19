import { products } from "@/data/portfolio";
import { IconArrow } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/25 blur-[120px]" />
        <div className="absolute top-10 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-[250px] w-[250px] rounded-full bg-amber-500/15 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Solutions numériques made in Africa
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-[1.1]">
          Nous construisons les{" "}
          <span className="bg-gradient-to-r from-teal-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
            applications
          </span>{" "}
          qui transforment l&apos;Afrique de l&apos;Ouest
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          Tabis Dev conçoit et déploie des plateformes de transport, de gestion
          commerciale et de paiement mobile — des outils concrets pour les
          entreprises et les citoyens.
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
                background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)`,
                boxShadow: `0 4px 20px ${p.accent}44`,
              }}
            >
              {p.name}
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-violet-600/30"
          >
            Découvrir le portfolio
            <IconArrow className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Nous contacter
          </a>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-white/5 pt-10">
          {[
            { value: "4+", label: "Produits actifs", color: "#3B82F6" },
            { value: "5K+", label: "Utilisateurs", color: "#10B981" },
            { value: "20+", label: "Villes connectées", color: "#F59E0B" },
          ].map((stat) => (
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
