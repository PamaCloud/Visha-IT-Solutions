import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import ScrollToTopOnNavigate from "@/components/layout/ScrollToTopOnNavigate";
import { QuoteDialogProvider } from "@/context/QuoteDialogContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Visha IT Solutions - Technology. Talent. Solutions.",
  description:
    "Empowering businesses with modern technology, innovative digital marketing, top-tier recruitment, and industry-leading training programs.",
  keywords: ["IT solutions", "Digital Marketing", "Recruitment", "Professional Training", "E-Commerce Development"],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
