"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

  // Intercept any click on "Get a Quote" or elements with data-quote-trigger
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href");
      const isQuoteTrigger =
        href === "/get-a-quote" ||
        target.hasAttribute("data-quote-trigger") ||
        target.getAttribute("aria-label") === "Get a Quote";

      if (isQuoteTrigger) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Close on Escape key
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

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-xl my-auto animate-in zoom-in-95 fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={closeQuoteDialog}
              className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-white text-slate-700 shadow-xl border border-slate-100 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 transition-all hover:scale-105 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {/* Classic Form Card */}
            <ClassicQuoteCard
              defaultInquiryType={defaultInquiry}
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
