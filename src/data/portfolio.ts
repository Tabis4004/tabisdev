export type ProductId = "tibus" | "gestabiscom" | "tabispay" | "tabisride";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  features: string[];
  accent: string;
  accentLight: string;
  gradient: string;
  icon: "bus" | "commerce" | "payment" | "ride";
  screenshots: { src: string; alt: string }[];
};

const PRODUCT_THEMES: Record<
  ProductId,
  Pick<Product, "accent" | "accentLight" | "gradient" | "icon" | "screenshots">
> = {
  tibus: {
    accent: "#0D9488",
    accentLight: "#CCFBF1",
    gradient: "from-teal-500 via-cyan-500 to-blue-600",
    icon: "bus",
    screenshots: [
      { src: "/screenshots/tibus/tibus-1.png", alt: "Tableau de bord Tibus" },
      { src: "/screenshots/tibus/tibus-2.png", alt: "Recherche de voyages Tibus" },
      { src: "/screenshots/tibus/tibus-3.png", alt: "Mes réservations Tibus" },
    ],
  },
  gestabiscom: {
    accent: "#7C3AED",
    accentLight: "#EDE9FE",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: "commerce",
    screenshots: [
      { src: "/screenshots/gestabiscom/gestabiscom-1.png", alt: "Connexion Gestabiscom" },
      { src: "/screenshots/gestabiscom/gestabiscom-2.png", alt: "Dashboard Gestabiscom" },
      { src: "/screenshots/gestabiscom/gestabiscom-3.png", alt: "Gestion produits Gestabiscom" },
    ],
  },
  tabispay: {
    accent: "#059669",
    accentLight: "#D1FAE5",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    icon: "payment",
    screenshots: [
      { src: "/screenshots/tabispay/tabispay-1.png", alt: "Dashboard TabisPay" },
      { src: "/screenshots/tabispay/tabispay-2.png", alt: "Encaissement TabisPay" },
      { src: "/screenshots/tabispay/tabispay-3.png", alt: "Transactions TabisPay" },
    ],
  },
  tabisride: {
    accent: "#D97706",
    accentLight: "#FEF3C7",
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    icon: "ride",
    screenshots: [
      { src: "/screenshots/tabisride/tabisride-1.png", alt: "Carte TabisRide" },
      { src: "/screenshots/tabisride/tabisride-2.png", alt: "Réservation TabisRide" },
      { src: "/screenshots/tabisride/tabisride-3.png", alt: "Espace conducteur TabisRide" },
    ],
  },
};

export function getProductTheme(id: ProductId) {
  return PRODUCT_THEMES[id];
}
