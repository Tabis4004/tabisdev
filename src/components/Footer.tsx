import { products } from "@/data/portfolio";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-semibold text-white">
                Tabis<span className="text-blue-400">Dev</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Solutions numériques pour l&apos;Afrique de l&apos;Ouest.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Produits</p>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 transition-colors hover:text-slate-300"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-white">Contact</p>
            <a
              href="mailto:tabiscompany@gmail.com"
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              tabiscompany@gmail.com
            </a>
            <p className="mt-2 text-sm text-slate-500">tabisdev.com</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-sm text-slate-600">
          © {year} Tabis Dev. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
