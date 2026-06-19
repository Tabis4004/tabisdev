export type Product = {
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

export const products: Product[] = [
  {
    name: "Tibus",
    tagline: "Voyager par bus devient facile",
    description:
      "Plateforme de réservation de billets de bus en Afrique de l'Ouest. Recherche de trajets, comparaison des prix, paiement mobile money et billets numériques avec QR code.",
    url: "https://tibus.app",
    category: "Transport & Mobilité",
    features: [
      "Réservation en ligne 24/7",
      "Paiement mobile money sécurisé",
      "Billets digitaux avec QR code",
      "Dashboard pour compagnies de bus",
    ],
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
  {
    name: "Gestabiscom",
    tagline: "Gérez votre activité commerciale",
    description:
      "Solution complète de gestion commerciale et terrain : installations, abonnements, équipes, stocks et reporting en temps réel pour les entreprises en croissance.",
    url: "https://gestabiscom.cervel.app",
    category: "Gestion & ERP",
    features: [
      "Suivi des installations terrain",
      "Gestion des abonnements clients",
      "Tableaux de bord analytiques",
      "Multi-tenant & multi-sites",
    ],
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
  {
    name: "TabisPay",
    tagline: "Paiements simplifiés",
    description:
      "Infrastructure de paiement mobile pour encaisser, suivre et réconcilier les transactions. Conçue pour s'intégrer aux écosystèmes Tabis et aux besoins locaux.",
    url: "https://tabispay.cervel.app",
    category: "Fintech",
    features: [
      "Encaissement mobile money",
      "Suivi des transactions",
      "Réconciliation automatique",
      "API d'intégration",
    ],
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
  {
    name: "TabisRide",
    tagline: "Mobilité urbaine à la demande",
    description:
      "Application de transport et mobilité urbaine connectant passagers et conducteurs. Réservation rapide, suivi en temps réel et paiement intégré.",
    url: "https://tibusride.lovable.app",
    category: "Transport & Mobilité",
    features: [
      "Courses à la demande",
      "Géolocalisation en temps réel",
      "Paiement intégré",
      "Interface conducteur & passager",
    ],
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
];
