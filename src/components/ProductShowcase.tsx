import type { Product } from "@/data/portfolio";
import {
  IconBus,
  IconCommerce,
  IconExternal,
  IconPayment,
  IconRide,
} from "./icons";
import { ScreenshotGallery } from "./ScreenshotGallery";

const iconMap = {
  bus: IconBus,
  commerce: IconCommerce,
  payment: IconPayment,
  ride: IconRide,
};

export function ProductShowcase({
  product,
  reversed = false,
}: {
  product: Product;
  reversed?: boolean;
}) {
  const Icon = iconMap[product.icon];
  const hostname = new URL(product.url).hostname;

  return (
    <article
      className="relative overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-slate-200/60"
      style={{
        background: `linear-gradient(135deg, white 0%, ${product.accentLight} 100%)`,
      }}
    >
      <div
        className={`pointer-events-none absolute -top-24 h-64 w-64 rounded-full blur-3xl ${reversed ? "-left-24" : "-right-24"}`}
        style={{ backgroundColor: `${product.accent}30` }}
      />

      <div
        className={`relative grid items-center gap-10 p-6 md:grid-cols-2 md:gap-12 md:p-10 lg:p-12 ${
          reversed ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
              style={{
                backgroundColor: product.accent,
                color: "#fff",
                boxShadow: `0 8px 24px ${product.accent}44`,
              }}
            >
              <Icon className="h-7 w-7" />
            </div>
            <span
              className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${product.accent}18`, color: product.accent }}
            >
              {product.category}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">{product.name}</h3>
          <p
            className="mt-2 text-lg font-semibold"
            style={{ color: product.accent }}
          >
            {product.tagline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {product.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full px-3 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: `${product.accent}15`,
                  color: product.accent,
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
              boxShadow: `0 8px 20px ${product.accent}33`,
            }}
          >
            Visiter {hostname}
            <IconExternal className="h-4 w-4" />
          </a>
        </div>

        <ScreenshotGallery
          screenshots={product.screenshots}
          accent={product.accent}
          productName={product.name}
        />
      </div>
    </article>
  );
}
