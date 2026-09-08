import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import ScrollToTopOnNavigate from "@/components/layout/ScrollToTopOnNavigate";
import { QuoteDialogProvider } from "@/context/QuoteDialogContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#004f6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vishait.com"),
  title: {
    default: "Visha IT Solutions - Technology. Talent. Solutions.",
    template: "%s | Visha IT Solutions",
  },
  description:
    "Visha IT Solutions provides enterprise-grade IT services, custom software & e-commerce development, performance digital marketing, talent recruitment, and professional tech training in India.",
  keywords: [
    "Visha IT Solutions",
    "IT Company Hyderabad",
    "Recruitment and Staffing India",
    "Talent Acquisition",
    "Payroll and HR Services",
    "Digital Marketing Agency",
    "E-Commerce Solutions",
    "Full Stack Training Hyderabad",
    "MERN Stack Course",
    "Java Developer Training",
    "Python AI Training",
    "Corporate Staffing",
  ],
  authors: [{ name: "Visha IT Solutions Pvt. Ltd.", url: "https://vishait.com" }],
  creator: "Visha IT Solutions",
  publisher: "Visha IT Solutions Pvt. Ltd.",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://vishait.com",
  },
  openGraph: {
    title: "Visha IT Solutions - Technology. Talent. Solutions.",
    description:
      "Enterprise technology architecture, e-commerce storefronts, digital performance marketing, strategic staffing, and career IT training.",
    url: "https://vishait.com",
    siteName: "Visha IT Solutions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Visha IT Solutions Corporate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visha IT Solutions - Technology. Talent. Solutions.",
    description:
      "Enterprise technology architecture, strategic recruitment, digital marketing, and industry-aligned training.",
    images: ["/logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://vishait.com/#organization",
      name: "Visha IT Solutions",
      legalName: "Visha IT Solutions Pvt. Ltd.",
      url: "https://vishait.com",
      logo: "https://vishait.com/logo-dark.png",
      description:
        "Enterprise technology architecture, e-commerce storefronts, digital marketing, recruitment staffing, and job-ready training academy.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9014646804",
        contactType: "customer service",
        email: "contact@vishait.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
      sameAs: [
        "https://www.linkedin.com/company/visha-it-solutions",
        "https://www.instagram.com/vishait",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://vishait.com/#website",
      url: "https://vishait.com",
      name: "Visha IT Solutions",
      publisher: {
        "@id": "https://vishait.com/#organization",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://vishait.com/#localbusiness",
      name: "Visha IT Solutions",
      url: "https://vishait.com",
      telephone: "+91-9014646804",
      email: "contact@vishait.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        addressCountry: "IN",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased flex flex-col min-h-screen bg-white`}>
        <QuoteDialogProvider>
          <ScrollToTopOnNavigate />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </QuoteDialogProvider>
      </body>
    </html>
  );
}
