import { getAboutValues, getSiteContent } from "@/lib/content";

export function About() {
  const { about } = getSiteContent();
  const values = getAboutValues();

  return (
    <section id="about" className="border-y border-slate-200/80 bg-gradient-to-br from-sky-50 via-white to-violet-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-600">
              À propos
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {about.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {about.description}
            </p>
          </div>

          <div className="space-y-4">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="rounded-2xl border p-6 shadow-sm"
                style={{
                  backgroundColor: value.bg,
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
                  <h3 className="font-semibold text-slate-900">{value.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
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
