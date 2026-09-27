import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tabisdev.com"),
  title: "Tabis Dev — Solutions numériques pour l'Afrique de l'Ouest",
  description:
    "Découvrez le portfolio Tabis Dev : Tibus, Tibus Courrier, Tista, TiConnect, Gestabiscom, TabisPay et TabisRide. Transport, courrier, stations-service, services, gestion commerciale et paiements mobiles.",
  keywords: [
    "Tabis Dev",
    "Tibus",
    "Tibus Courrier",
    "Tista",
    "TiConnect",
    "SYSCOHADA",
    "Gestabiscom",
    "TabisPay",
    "TabisRide",
    "Afrique de l'Ouest",
    "développement logiciel",
  ],
  openGraph: {
    title: "Tabis Dev — Solutions numériques pour l'Afrique de l'Ouest",
    description:
      "Transport, courrier, stations-service, services, gestion commerciale et paiements mobiles — nos produits au service des entreprises et des citoyens.",
    url: "https://tabisdev.com",
    siteName: "Tabis Dev",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Tabis Dev" }],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans text-slate-700 antialiased">
        {children}
      </body>
    </html>
  );
}
