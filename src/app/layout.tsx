import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Granja Ecológica Lindero | Tomaykichwa, Huánuco, Perú",
  description:
    "Vive una experiencia única en la Granja Ecológica Lindero. Hospedaje campestre, restaurante, granja interactiva, talleres de horticultura terapéutica y más en Tomaykichwa, Huánuco, Perú.",
  keywords: [
    "granja ecológica",
    "Huánuco",
    "Tomaykichwa",
    "hospedaje campestre",
    "ecoturismo Perú",
    "horticultura terapéutica",
    "tour vivencial",
  ],
  openGraph: {
    title: "Granja Ecológica Lindero",
    description: "Reconecta con la naturaleza en Tomaykichwa, Huánuco, Perú.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
