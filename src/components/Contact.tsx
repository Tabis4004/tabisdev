export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-blue-600/20 via-[#151D2E] to-violet-600/20 p-8 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-[80px]" />

          <div className="relative max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Un projet en tête ?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Que vous souhaitiez intégrer nos solutions ou développer un nouveau
              produit, notre équipe est à votre écoute.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:tabisdev@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B1120] transition-colors hover:bg-slate-100"
              >
                tabisdev@gmail.com
              </a>
              <a
                href="https://tibus.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Découvrir Tibus
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
