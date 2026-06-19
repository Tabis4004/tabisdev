import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tabis Dev — Solutions numériques pour l'Afrique de l'Ouest",
  description:
    "Découvrez le portfolio Tabis Dev : Tibus, Gestabiscom, TabisPay et TabisRide. Transport, gestion commerciale et paiements mobiles.",
  keywords: [
    "Tabis Dev",
    "Tibus",
    "Gestabiscom",
    "TabisPay",
    "TabisRide",
    "Afrique de l'Ouest",
    "développement logiciel",
  ],
  openGraph: {
    title: "Tabis Dev — Solutions numériques pour l'Afrique de l'Ouest",
    description:
      "Transport, gestion commerciale et paiements mobiles — nos produits au service des entreprises et des citoyens.",
    url: "https://tabisdev.com",
    siteName: "Tabis Dev",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#0B1120] font-sans text-slate-300 antialiased">
        {children}
      </body>
    </html>
  );
}
