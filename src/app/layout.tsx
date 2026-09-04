import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.defensalegalfinanciera.com'),
  title: "Insolvencia - Defensa Legal Financiera con Toro Legal",
  description: "Recupera tu vida y borra tus deudas legalmente con la Ley de Insolvencia en Colombia. Frena embargos, remates y obtén un reinicio financiero real.",
  keywords: ["Ley de Insolvencia", "borrar deudas", "Toro Legal", "abogados insolvencia", "frenar embargos Colombia", "reinicio financiero"],
  alternates: {
    canonical: "https://www.defensalegalfinanciera.com",
  },
  // La imagen de previsualización sale de src/app/opengraph-image.jpg y
  // src/app/twitter-image.jpg (convención de archivo de Next, que tiene
  // prioridad sobre este objeto). Se regenera con `npm run og`.
  openGraph: {
    title: "Insolvencia - Defensa Legal Financiera",
    description: "Recupera tu vida y borra tus deudas legalmente con la Ley de Insolvencia en Colombia. Frena embargos y obtén un reinicio financiero.",
    url: "https://www.defensalegalfinanciera.com",
    type: "website",
    locale: "es_CO",
    siteName: "Defensa Legal Insolvencia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ley de Insolvencia - Toro Legal",
    description: "Frena embargos y obtén un reinicio financiero legalmente en Colombia.",
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
    "name": "Toro Legal - Abogados de Insolvencia",
    "legalName": "Toro Legal Abogados S.A.S.",
    "taxID": "902066320-8",
    "description": "Servicios legales especializados en la Ley de Insolvencia en Colombia. Frena embargos y obtén asesoría financiera y jurídica.",
    "url": "https://www.defensalegalfinanciera.com",
    "logo": "https://www.defensalegalfinanciera.com/images/logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pereira",
      "addressRegion": "Risaralda",
      "addressCountry": "CO",
    },
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
