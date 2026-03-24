import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Insolvencia - Perfil Profesional Andrés Toro",
  description: "Recupera tu vida y borra tus deudas legalmente con la Ley de Insolvencia. Frena embargos y obtén un reinicio financiero.",
  openGraph: {
    title: "Insolvencia - Defensa Legal Financiera",
    description: "Recupera tu vida y borra tus deudas legalmente con la Ley de Insolvencia. Frena embargos y obtén un reinicio financiero.",
    type: "website",
    locale: "es_CO",
    siteName: "Defensa Legal Insolvencia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ley de Insolvencia - Andrés Toro",
    description: "Frena embargos y obtén un reinicio financiero legalmente.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Andrés Toro - Abogado Insolvencia",
    "description": "Servicios legales especializados en la Ley de Insolvencia en Colombia. Frena embargos y obtén asesoría financiera y jurídica.",
    "url": "https://www.defensalegalfinanciera.com",
    "areaServed": "CO",
    "knowsAbout": ["Ley de Insolvencia", "Derecho Civil", "Derecho de Familia", "Derecho Comercial"],
  };

  return (
    <html lang="es" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
