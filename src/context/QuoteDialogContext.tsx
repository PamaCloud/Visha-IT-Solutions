"use client";

import React, { createContext, useContext, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import ClassicQuoteCard from "@/components/forms/ClassicQuoteCard";

interface QuoteDialogContextType {
  isOpen: boolean;
  openQuoteDialog: (inquiryType?: string) => void;
  closeQuoteDialog: () => void;
}

const QuoteDialogContext = createContext<QuoteDialogContextType>({
  isOpen: false,
  openQuoteDialog: () => {},
  closeQuoteDialog: () => {},
});

export const useQuoteDialog = () => useContext(QuoteDialogContext);

function QueryParamQuoteListener({
  onTrigger,
}: {
  onTrigger: (inquiry?: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const quoteParam = searchParams.get("quote");
      if (quoteParam === "true" || quoteParam === "open" || searchParams.has("quote")) {
        const inquiry = searchParams.get("inquiry") || undefined;
        onTrigger(inquiry);

        // Clean up URL query without reloading the page
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("quote");
          url.searchParams.delete("inquiry");
          window.history.replaceState(
            {},
            "",
            url.pathname + (url.search ? url.search : "") + url.hash
          );
        }
      }
    }
  }, [searchParams, onTrigger]);

  return null;
}

export function QuoteDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultInquiry, setDefaultInquiry] = useState("");

  const openQuoteDialog = (inquiryType?: string) => {
    if (inquiryType) setDefaultInquiry(inquiryType);
    setIsOpen(true);
  };

  const closeQuoteDialog = () => {
    setIsOpen(false);
  };

  // Intercept any click on "Get a Quote" or elements with data-quote-trigger in the capture phase
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href");
      const isQuoteTrigger =
        href === "/get-a-quote" ||
        href?.startsWith("/get-a-quote") ||
        target.hasAttribute("data-quote-trigger") ||
        target.getAttribute("aria-label") === "Get a Quote" ||
        target.textContent?.trim().toLowerCase() === "get a quote";

      if (isQuoteTrigger) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  // Close on Escape key & disable body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <QuoteDialogContext.Provider value={{ isOpen, openQuoteDialog, closeQuoteDialog }}>
      <Suspense fallback={null}>
        <QueryParamQuoteListener onTrigger={openQuoteDialog} />
      </Suspense>

      {children}

      {/* ── Dialog / Modal Overlay ─────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <div
            onClick={closeQuoteDialog}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Modal Container - Sleek, compact and comfortable fit */}
          <div className="relative z-10 w-full max-w-[465px] my-auto animate-in zoom-in-95 fade-in duration-200">
            {/* Classic Form Card with elegant integrated inside close button */}
            <ClassicQuoteCard
              defaultInquiryType={defaultInquiry}
              onClose={closeQuoteDialog}
              onSuccess={() => {
                setTimeout(closeQuoteDialog, 2500);
              }}
            />
          </div>
        </div>
      )}
    </QuoteDialogContext.Provider>
  );
}
