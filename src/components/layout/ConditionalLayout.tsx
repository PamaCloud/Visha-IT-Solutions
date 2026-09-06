"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isExcluded =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isExcluded) {
    return <main className="min-h-screen w-full flex flex-col">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
