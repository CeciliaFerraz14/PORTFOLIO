import type { Metadata } from "next";
import { DM_Sans, Fredoka, Josefin_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Tipografía redondeada de la marca Jukeboxdev
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cecilia · Desarrollo con intención",
  description: "Portfolio de Cecilia Ferraz, estudiante de DAM y builder de herramientas digitales en Zaragoza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${spaceMono.variable} ${josefinSans.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
