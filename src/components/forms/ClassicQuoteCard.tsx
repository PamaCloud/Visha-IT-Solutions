"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
  PROFILE_TYPE_OPTIONS,
  INQUIRY_TYPE_OPTIONS,
  validateQuoteField,
  QuoteFormValues,
} from "@/validators/quoteValidator";
import { submitQuoteEnquiry } from "@/handlers/enquiryHandlers";

interface Props {
  onSuccess?: () => void;
  className?: string;
  defaultInquiryType?: string;
}

export default function ClassicQuoteCard({
  onSuccess,
  className = "",
  defaultInquiryType = "",
}: Props) {
  const [formData, setFormData] = useState<QuoteFormValues>({
    fullName: "",
    profileType: "",
    inquiryType: defaultInquiryType || "",
    mobileNumber: "",
    email: "",
  });

  const [touched, setTouched] = useState<Record<keyof QuoteFormValues, boolean>>({
    fullName: false,
    profileType: false,
    inquiryType: false,
    mobileNumber: false,
    email: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<keyof QuoteFormValues, string | null>>({
    fullName: null,
    profileType: null,
    inquiryType: null,
    mobileNumber: null,
    email: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof QuoteFormValues, value: string) => {
    let sanitizedValue = value;

    if (field === "fullName") {
      // Allow only letters and spaces; block numbers and special characters completely
      sanitizedValue = value
        .replace(/[^A-Za-z ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);
    } else if (field === "mobileNumber") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "email") {
      // Disallow spaces and special characters that cannot exist in valid email
      let clean = value.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._+-]/g, "");
      const atIndex = clean.indexOf("@");
      if (atIndex !== -1) {
        clean = clean.slice(0, atIndex + 1) + clean.slice(atIndex + 1).replace(/@/g, "");
      }
      sanitizedValue = clean.slice(0, 254);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

    // If already touched, validate live so error clears immediately upon correction
    if (touched[field]) {
      const error = validateQuoteField(field, sanitizedValue);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof QuoteFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateQuoteField(field, formData[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Mark all fields as touched
    const allTouched: Record<keyof QuoteFormValues, boolean> = {
      fullName: true,
      profileType: true,
      inquiryType: true,
      mobileNumber: true,
      email: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const nameErr = validateQuoteField("fullName", formData.fullName);
    const profileErr = validateQuoteField("profileType", formData.profileType);
    const inquiryErr = validateQuoteField("inquiryType", formData.inquiryType);
    const mobileErr = validateQuoteField("mobileNumber", formData.mobileNumber);
    const emailErr = validateQuoteField("email", formData.email);

    const errors = {
      fullName: nameErr,
      profileType: profileErr,
      inquiryType: inquiryErr,
      mobileNumber: mobileErr,
      email: emailErr,
    };
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err !== null);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Backend Validation & Storage via Server Action
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName.trim());
      submitData.append("profileType", formData.profileType);
      submitData.append("inquiryType", formData.inquiryType);
      submitData.append("mobileNumber", formData.mobileNumber);
      submitData.append("email", formData.email.trim());

      const res = await submitQuoteEnquiry(submitData);

      if (!res.success && res.errors) {
        setFieldErrors({
          fullName: res.errors.fullName?.[0] || null,
          profileType: res.errors.profileType?.[0] || null,
          inquiryType: res.errors.inquiryType?.[0] || null,
          mobileNumber: res.errors.mobileNumber?.[0] || null,
          email: res.errors.email?.[0] || null,
        });
        setGeneralError(res.message || "Please resolve the highlighted errors.");
        setIsSubmitting(false);
        return;
      }

      // WhatsApp Message Hand-off
      const text = `*New Advisory & Quote Request - Visha IT Solutions*%0A%0A*Name:* ${encodeURIComponent(
        formData.fullName.trim()
      )}%0A*Profile Type:* ${encodeURIComponent(
        formData.profileType
      )}%0A*Inquiry Type:* ${encodeURIComponent(
        formData.inquiryType
      )}%0A*Mobile:* +91 ${encodeURIComponent(
        formData.mobileNumber
      )}%0A*Email:* ${encodeURIComponent(formData.email.trim())}`;

      const whatsappUrl = `https://wa.me/917036592351?text=${text}`;

      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2500);
      }
    } catch {
      setGeneralError(
        "Something went wrong while submitting. Please try again or reach out directly on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[380px] ${className}`}
      >
        <div className="w-13 h-13 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs border border-emerald-100">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
          Request Received!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed mb-5 font-normal">
          Thank you, <strong className="text-slate-800">{formData.fullName}</strong>. Our enterprise solutions team has received your enquiry and will call you back within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              fullName: "",
              profileType: "",
              inquiryType: "",
              mobileNumber: "",
              email: "",
            });
            setTouched({
              fullName: false,
              profileType: false,
              inquiryType: false,
              mobileNumber: false,
              email: false,
            });
            setFieldErrors({
              fullName: null,
              profileType: null,
              inquiryType: null,
              mobileNumber: null,
              email: null,
            });
          }}
          className="text-xs font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] hover:underline cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-100/90 shadow-[0_16px_40px_rgba(0,0,0,0.08)] p-5 sm:p-6.5 w-full max-w-[465px] mx-auto ${className}`}
    >
      {/* Form Header - Compact & refined */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-[22px] font-black text-slate-900 tracking-tight leading-snug mb-1">
          Get Advisory & Project Quote
        </h2>
        <p className="text-xs text-slate-500 font-normal leading-relaxed">
          Share your details — our technical solutions expert will call you back.
        </p>
      </div>

      {generalError && (
        <div className="mb-3 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1.5">
          <AlertCircle size={14} className="shrink-0 text-rose-500" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* 1. YOUR NAME */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Your Name <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onKeyDown={(e) => {
              if (
                e.ctrlKey ||
                e.metaKey ||
                ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
              ) {
                return;
              }
              if (e.key === " ") {
                const input = e.currentTarget;
                if (input.selectionStart === 0 || input.value.endsWith(" ")) {
                  e.preventDefault();
                }
                return;
              }
              if (!/^[A-Za-z]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => handleFieldChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            placeholder="e.g., John Doe"
            maxLength={50}
            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
              touched.fullName && fieldErrors.fullName
                ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
            }`}
          />
          {touched.fullName && fieldErrors.fullName && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              {fieldErrors.fullName}
            </p>
          )}
        </div>

        {/* 2. PROFILE TYPE */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Profile Type <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.profileType}
              onChange={(e) => handleFieldChange("profileType", e.target.value)}
              onBlur={() => handleBlur("profileType")}
              className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer pr-9 shadow-2xs ${
                touched.profileType && fieldErrors.profileType
                  ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
              }`}
            >
              <option value="" disabled>
                Select organisation type
              </option>
              {PROFILE_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          {touched.profileType && fieldErrors.profileType && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              {fieldErrors.profileType}
            </p>
          )}
        </div>

        {/* 3. INQUIRY TYPE */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Inquiry Type <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.inquiryType}
              onChange={(e) => handleFieldChange("inquiryType", e.target.value)}
              onBlur={() => handleBlur("inquiryType")}
              className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer pr-9 shadow-2xs ${
                touched.inquiryType && fieldErrors.inquiryType
                  ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
              }`}
            >
              <option value="" disabled>
                Select inquiry type
              </option>
              {INQUIRY_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          {touched.inquiryType && fieldErrors.inquiryType && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              {fieldErrors.inquiryType}
            </p>
          )}
        </div>

        {/* 4. MOBILE NUMBER */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Mobile Number <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <div className="flex items-center gap-2">
            <div className="w-13 sm:w-15 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-xs sm:text-sm shrink-0 select-none">
              +91
            </div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobileNumber}
              onKeyDown={(e) => {
                if (
                  e.ctrlKey ||
                  e.metaKey ||
                  ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                ) {
                  return;
                }
                // Digits only
                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                  return;
                }
                // First digit must be 6, 7, 8, 9
                const input = e.currentTarget;
                if (
                  input.value.length === 0 ||
                  (input.selectionStart === 0 && input.selectionEnd === input.value.length)
                ) {
                  if (!/^[6-9]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              }}
              onChange={(e) => handleFieldChange("mobileNumber", e.target.value)}
              onBlur={() => handleBlur("mobileNumber")}
              placeholder="10-digit mobile number"
              className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                touched.mobileNumber && fieldErrors.mobileNumber
                  ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
              }`}
            />
          </div>
          {touched.mobileNumber && fieldErrors.mobileNumber && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              {fieldErrors.mobileNumber}
            </p>
          )}
        </div>

        {/* 5. EMAIL ADDRESS */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Email Address <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <input
            type="email"
            maxLength={254}
            value={formData.email}
            onKeyDown={(e) => {
              if (
                e.ctrlKey ||
                e.metaKey ||
                ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
              ) {
                return;
              }
              // Restrict spaces
              if (e.key === " ") {
                e.preventDefault();
                return;
              }
              // Restrict duplicate @
              if (e.key === "@" && e.currentTarget.value.includes("@")) {
                e.preventDefault();
                return;
              }
              // Restrict to valid email characters
              if (!/^[a-zA-Z0-9._+@-]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="e.g., john@example.com"
            className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
              touched.email && fieldErrors.email
                ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
            }`}
          />
          {touched.email && fieldErrors.email && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
              <AlertCircle size={12} className="shrink-0" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* CTA SUBMIT BUTTON */}
        <div className="pt-1.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 sm:h-11.5 rounded-xl bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,30%)] hover:from-[hsl(195,100%,18%)] hover:to-[hsl(195,100%,26%)] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(0,105,148,0.25)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <span>Request a Call Back</span>
            )}
          </button>
        </div>

        {/* Disclaimer / Privacy Text */}
        <p className="text-[10px] text-slate-400 leading-tight text-center pt-0.5">
          By submitting, you authorise Visha IT Solutions Pvt. Ltd. to contact you regarding your enquiry. We respect your privacy.
        </p>
      </form>
    </div>
  );
}
