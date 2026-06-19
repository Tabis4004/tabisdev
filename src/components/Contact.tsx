export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-500 via-violet-500 to-teal-500 p-8 shadow-2xl shadow-violet-500/20 md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/20 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-300/30 blur-[60px]" />

          <div className="relative max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-100">
              Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Un projet en tête ?
            </h2>
            <p className="mt-4 text-lg text-blue-50">
              Que vous souhaitiez intégrer nos solutions ou développer un nouveau
              produit, notre équipe est à votre écoute.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:tabiscompany@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-colors hover:bg-blue-50"
              >
                tabiscompany@gmail.com
              </a>
              <a
                href="https://tibus.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
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
