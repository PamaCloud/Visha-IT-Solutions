import type { Metadata } from "next";
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Visha IT Solutions - Technology. Talent. Solutions.",
  description:
    "Empowering businesses with modern technology, innovative digital marketing, top-tier recruitment, and industry-leading training programs.",
  keywords: ["IT solutions", "Digital Marketing", "Recruitment", "Professional Training", "E-Commerce Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} font-sans antialiased flex flex-col min-h-screen pt-24 lg:pt-32 bg-surface`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
