const values = [
  {
    title: "Impact local",
    color: "#10B981",
    description:
      "Nos solutions répondent aux réalités du terrain : mobile money, connectivité variable, besoins des PME africaines.",
  },
  {
    title: "Technologie moderne",
    color: "#3B82F6",
    description:
      "Applications web et mobiles performantes, architectures cloud scalables et interfaces pensées pour l'utilisateur.",
  },
  {
    title: "Écosystème intégré",
    color: "#8B5CF6",
    description:
      "Nos produits se complètent : transport, gestion commerciale et paiement forment un écosystème cohérent Tabis.",
  },
];

export function About() {
  return (
    <section id="about" className="border-y border-white/5 bg-[#0D1424] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              À propos
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Tabis Dev, votre partenaire numérique
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Nous sommes une société de développement logiciel spécialisée dans
              la création de solutions numériques pour l&apos;Afrique de
              l&apos;Ouest. De la billetterie de bus à la gestion commerciale
              en passant par les paiements mobiles, nous accompagnons entreprises
              et voyageurs dans leur transformation digitale.
            </p>
          </div>

          <div className="space-y-4">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-xl border border-white/8 p-6"
                style={{
                  background: `linear-gradient(135deg, ${value.color}15, #151D2E)`,
                  borderColor: `${value.color}33`,
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: value.color }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-semibold text-white">{value.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
