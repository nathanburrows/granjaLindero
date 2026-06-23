import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "La Granja Ecológica Lindero | Tomaykichwa, Huánuco, Perú",
  description:
    "Vive una experiencia única en La Granja Ecológica Lindero. Hospedaje campestre, restaurante, granja interactiva, talleres de horticultura terapéutica y más en Tomaykichwa, Huánuco, Perú.",
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
    title: "La Granja Ecológica Lindero",
    description: "Reconecta con la naturaleza en Tomaykichwa, Huánuco, Perú.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
