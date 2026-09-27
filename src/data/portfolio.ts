export type ProductId =
  | "tibus"
  | "tibuscourrier"
  | "tista"
  | "ticonnect"
  | "gestabiscom"
  | "tabispay"
  | "tabisride";

export type Product = {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  badge?: string;
  features: string[];
  accent: string;
  accentLight: string;
  gradient: string;
  icon: "bus" | "commerce" | "payment" | "ride" | "parcel" | "fuel" | "connect";
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
  tibuscourrier: {
    accent: "#E11D48",
    accentLight: "#FFE4E6",
    gradient: "from-rose-500 via-pink-500 to-red-600",
    icon: "parcel",
    screenshots: [
      { src: "/screenshots/tibuscourrier/tibuscourrier-1.png", alt: "Tableau de bord Tibus Courrier" },
      { src: "/screenshots/tibuscourrier/tibuscourrier-2.png", alt: "Scan à l'embarquement Tibus Courrier" },
      { src: "/screenshots/tibuscourrier/tibuscourrier-3.png", alt: "Rapport financier Tibus Courrier" },
    ],
  },
  tista: {
    accent: "#0284C7",
    accentLight: "#E0F2FE",
    gradient: "from-sky-500 via-blue-500 to-cyan-600",
    icon: "fuel",
    screenshots: [
      { src: "/screenshots/tista/tista-1.png", alt: "Ventes par index Tista" },
      { src: "/screenshots/tista/tista-2.png", alt: "Bons d'essence et cartes prépayées Tista" },
      { src: "/screenshots/tista/tista-3.png", alt: "Bilan SYSCOHADA Tista" },
    ],
  },
  ticonnect: {
    accent: "#4F46E5",
    accentLight: "#E0E7FF",
    gradient: "from-indigo-500 via-blue-600 to-violet-600",
    icon: "connect",
    screenshots: [
      { src: "/screenshots/ticonnect/ticonnect-1.png", alt: "Recherche d'artisans TiConnect" },
      { src: "/screenshots/ticonnect/ticonnect-2.png", alt: "Profil artisan TiConnect" },
      { src: "/screenshots/ticonnect/ticonnect-3.png", alt: "Demandes de service TiConnect" },
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
