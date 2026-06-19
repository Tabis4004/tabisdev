import siteData from "../../content/site.json";
import { getProductTheme, type Product, type ProductId } from "@/data/portfolio";

export type SiteContent = {
  email: string;
  domain: string;
  footerTagline: string;
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    stats: { value: string; label: string }[];
  };
  portfolio: {
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
  };
  about: {
    title: string;
    description: string;
    values: { title: string; description: string }[];
  };
  contact: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  products: {
    id: ProductId;
    name: string;
    tagline: string;
    description: string;
    url: string;
    category: string;
    features: string[];
  }[];
};

const VALUE_STYLES = [
  { color: "#10B981", bg: "#ECFDF5" },
  { color: "#3B82F6", bg: "#EFF6FF" },
  { color: "#8B5CF6", bg: "#F5F3FF" },
] as const;

const STAT_COLORS = ["#2563EB", "#059669", "#D97706"] as const;

export function getSiteContent(): SiteContent {
  return siteData as SiteContent;
}

export function getProducts(): Product[] {
  const content = getSiteContent();

  return content.products.map((product) => ({
    ...product,
    ...getProductTheme(product.id),
  }));
}

export function getAboutValues() {
  return getSiteContent().about.values.map((value, index) => ({
    ...value,
    ...VALUE_STYLES[index % VALUE_STYLES.length],
  }));
}

export function getHeroStats() {
  return getSiteContent().hero.stats.map((stat, index) => ({
    ...stat,
    color: STAT_COLORS[index % STAT_COLORS.length],
  }));
}
