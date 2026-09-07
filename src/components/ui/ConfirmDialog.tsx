'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside to cancel */}
      <div className="fixed inset-0" onClick={isLoading ? undefined : onCancel} />

      {/* Dialog Card (Matches Screenshot 1 exact design) */}
      <div className="relative bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-8 max-w-sm w-full text-center border border-slate-100/80 z-10 scale-in-95 duration-150">
        <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mb-7 leading-relaxed max-w-xs mx-auto">
          {message}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="flex-1 py-2.5 px-5 rounded-full border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-5 rounded-full text-xs sm:text-sm font-semibold text-white transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
              isDestructive
                ? 'bg-[#e60049] hover:bg-[#d10042] shadow-rose-500/25'
                : 'bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] shadow-sky-500/25'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
