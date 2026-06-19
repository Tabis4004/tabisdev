import { getProducts, getSiteContent } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { email, domain, footerTagline } = getSiteContent();
  const products = getProducts();

  return (
    <footer className="border-t border-slate-200 bg-white/70 py-12 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <span className="font-semibold text-slate-900">
                Tabis<span className="text-blue-600">Dev</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-500">{footerTagline}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Produits</p>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 transition-colors hover:text-blue-600"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Contact</p>
            <a
              href={`mailto:${email}`}
              className="text-sm text-slate-500 transition-colors hover:text-blue-600"
            >
              {email}
            </a>
            <p className="mt-2 text-sm text-slate-500">{domain}</p>
            <a
              href="/admin"
              className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
            >
              Éditer le site →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          © {year} Tabis Dev. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
