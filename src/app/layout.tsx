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
    default: "Visha IT Solutions - Technology. Talent. Solutions. | Global IT & Staffing",
    template: "%s | Visha IT Solutions",
  },
  description:
    "Visha IT Solutions provides enterprise-grade IT services, custom software development, UK & India IT recruitment staffing, performance digital marketing, and industry-certified tech training.",
  keywords: [
    "Visha IT Solutions",
    "IT Company Hyderabad",
    "UK IT Staffing Agency",
    "IT Recruitment Agency India",
    "Offshore Software Development",
    "Custom Web Application Development",
    "E-Commerce Solutions Company",
    "Performance Digital Marketing Agency",
    "Talent Acquisition & Executive Search",
    "Full Stack Developer Training Hyderabad",
    "Cloud Engineering & DevOps Services",
    "Cross-Border IT Staffing UK",
    "MERN Stack & Python AI Course",
    "Java Enterprise Development",
    "Corporate Staffing & Payroll Management",
    "Enterprise IT Consulting Services",
  ],
  authors: [{ name: "Visha IT Solutions Pvt. Ltd.", url: "https://vishait.com" }],
  creator: "Visha IT Solutions",
  publisher: "Visha IT Solutions Pvt. Ltd.",
  category: "Technology",
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
      "Global technology engineering, cross-border IT staffing, e-commerce architectures, digital marketing scaling, and professional tech training.",
    url: "https://vishait.com",
    siteName: "Visha IT Solutions",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN"],
    type: "website",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "Visha IT Solutions - Technology. Talent. Solutions.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visha IT Solutions - Technology. Talent. Solutions.",
    description:
      "Enterprise technology architecture, UK & India IT recruitment, digital marketing, and industry-aligned training.",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
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
        "Global technology engineering, UK & India IT talent staffing, e-commerce architectures, digital performance marketing, and corporate training academy.",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Apurupa Turbo Tower, No:36 Pillar No:1680, 2-293/82/a/787, Road, Jubilee Hills",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500033",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9014646804",
          contactType: "customer service",
          email: "info@vishaitsolutions.com",
          areaServed: ["IN", "GB", "US", "AE"],
          availableLanguage: ["English", "Hindi", "Telugu"],
        },
      ],
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
      potentialAction: {
        "@type": "SearchAction",
        target: "https://vishait.com/services?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vishait.com/#service-hyderabad",
      name: "Visha IT Solutions - Global HQ",
      url: "https://vishait.com",
      telephone: "+91-9014646804",
      email: "info@vishaitsolutions.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Apurupa Turbo Tower, No:36 Pillar No:1680, 2-293/82/a/787, Road, Jubilee Hills",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500033",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://vishait.com/#service-london",
      name: "Visha IT Solutions - UK Operations",
      url: "https://vishait.com",
      telephone: "+91-9014646804",
      email: "info@vishaitsolutions.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressRegion: "Greater London",
        addressCountry: "GB",
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
