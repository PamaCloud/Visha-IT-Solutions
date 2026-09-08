"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Loader2, AlertCircle, X, ShieldCheck } from "lucide-react";
import {
  SERVICE_REQUIRED_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  validateQuoteField,
  QuoteFormValues,
} from "@/validators/quoteValidator";
import { submitQuoteEnquiry } from "@/handlers/enquiryHandlers";

interface Props {
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
  defaultInquiryType?: string;
}

export default function ClassicQuoteCard({
  onSuccess,
  onClose,
  className = "",
  defaultInquiryType = "",
}: Props) {
  const [formData, setFormData] = useState<QuoteFormValues>({
    fullName: "",
    companyName: "",
    email: "",
    mobileNumber: "",
    serviceRequired: defaultInquiryType || "E-Commerce",
    description: "",
    budgetRange: "Flexible / Discuss Later",
    preferredContactMethod: "WhatsApp",
    consent: false,
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof QuoteFormValues, value: any) => {
    let sanitizedValue = value;

    if (field === "fullName") {
      sanitizedValue = value
        .replace(/[^A-Za-z ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);
    } else if (field === "mobileNumber") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "email") {
      let clean = value.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._+-]/g, "");
      const atIndex = clean.indexOf("@");
      if (atIndex !== -1) {
        clean = clean.slice(0, atIndex + 1) + clean.slice(atIndex + 1).replace(/@/g, "");
      }
      sanitizedValue = clean.slice(0, 254);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

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

    const allTouched: Record<string, boolean> = {
      fullName: true,
      email: true,
      mobileNumber: true,
      serviceRequired: true,
      description: true,
      consent: true,
    };
    setTouched(allTouched);

    const nameErr = validateQuoteField("fullName", formData.fullName);
    const emailErr = validateQuoteField("email", formData.email);
    const mobileErr = validateQuoteField("mobileNumber", formData.mobileNumber);
    const serviceErr = validateQuoteField("serviceRequired", formData.serviceRequired);
    const descErr = validateQuoteField("description", formData.description);
    const consentErr = validateQuoteField("consent", formData.consent);

    const errors = {
      fullName: nameErr,
      email: emailErr,
      mobileNumber: mobileErr,
      serviceRequired: serviceErr,
      description: descErr,
      consent: consentErr,
    };
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err !== null);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName.trim());
      submitData.append("companyName", formData.companyName?.trim() || "");
      submitData.append("email", formData.email.trim());
      submitData.append("mobileNumber", formData.mobileNumber);
      submitData.append("serviceRequired", formData.serviceRequired);
      submitData.append("description", formData.description.trim());
      submitData.append("budgetRange", formData.budgetRange || "Flexible");
      submitData.append("preferredContactMethod", formData.preferredContactMethod || "WhatsApp");
      submitData.append("consent", String(formData.consent));

      const res = await submitQuoteEnquiry(submitData);

      if (!res.success && res.errors) {
        setFieldErrors({
          fullName: res.errors.fullName?.[0] || null,
          email: res.errors.email?.[0] || null,
          mobileNumber: res.errors.mobileNumber?.[0] || null,
          serviceRequired: res.errors.serviceRequired?.[0] || null,
          description: res.errors.description?.[0] || null,
          consent: res.errors.consent?.[0] || null,
        });
        setGeneralError(res.message || "Please resolve the highlighted errors.");
        setIsSubmitting(false);
        return;
      }

      // WhatsApp Message Hand-off
      const fullMessage = [
        "🚀 *New Project Quote Request (Visha IT Solutions)*",
        "----------------------------------------",
        `👤 *Client Name:* ${formData.fullName.trim()}`,
        `🏢 *Company:* ${formData.companyName?.trim() || "Not specified"}`,
        `💼 *Service Required:* ${formData.serviceRequired}`,
        `📱 *Mobile Number:* +91 ${formData.mobileNumber}`,
        `✉️ *Business Email:* ${formData.email.trim()}`,
        `💰 *Budget Range:* ${formData.budgetRange}`,
        `📝 *Requirement Details:*`,
        formData.description.trim(),
        "----------------------------------------",
        "🌐 *Source:* Visha IT Solutions Website",
      ].join("\n");

      const whatsappUrl = `https://wa.me/919014646804?text=${encodeURIComponent(fullMessage)}`;

      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 2500);
      }
    } catch {
      setGeneralError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`relative bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-8 text-center flex flex-col items-center justify-center min-h-[360px] ${className}`}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label="Close dialog"
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        )}
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 shadow-xs border border-emerald-100">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Thank you!
        </h3>
        <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed mb-6 font-medium">
          Thank you. Our solutions team will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              fullName: "",
              companyName: "",
              email: "",
              mobileNumber: "",
              serviceRequired: "E-Commerce",
              description: "",
              budgetRange: "Flexible / Discuss Later",
              preferredContactMethod: "WhatsApp",
              consent: false,
            });
            setTouched({});
            setFieldErrors({});
          }}
          className="text-xs font-bold uppercase tracking-wider text-[#0d5cd9] hover:underline cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white rounded-3xl border border-slate-150 shadow-[0_25px_60px_rgba(0,0,0,0.15)] p-5 sm:p-7 w-full max-w-[620px] mx-auto max-h-[92vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 border-b border-slate-100 pb-3.5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            Get a Free Project Quote
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            Share your project requirements — our solutions team will contact you promptly.
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
            aria-label="Close form"
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        )}
      </div>

      {generalError && (
        <div className="mb-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
        {/* Row 1: Full Name & Mobile Number */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => handleFieldChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              placeholder="e.g., John Doe"
              className={`w-full h-10.5 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all ${
                touched.fullName && fieldErrors.fullName
                  ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10"
              }`}
            />
            {touched.fullName && fieldErrors.fullName && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-semibold text-slate-500 pointer-events-none">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={formData.mobileNumber}
                onChange={(e) => handleFieldChange("mobileNumber", e.target.value)}
                onBlur={() => handleBlur("mobileNumber")}
                placeholder="9876543210"
                className={`w-full h-10.5 pl-11 pr-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all ${
                  touched.mobileNumber && fieldErrors.mobileNumber
                    ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                    : "border-slate-200 focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10"
                }`}
              />
            </div>
            {touched.mobileNumber && fieldErrors.mobileNumber && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.mobileNumber}</p>
            )}
          </div>
        </div>

        {/* Row 2: Business Email & Company Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Business Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="e.g., john@company.com"
              className={`w-full h-10.5 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all ${
                touched.email && fieldErrors.email
                  ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10"
              }`}
            />
            {touched.email && fieldErrors.email && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Company Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleFieldChange("companyName", e.target.value)}
              placeholder="e.g., Acme Enterprises"
              className="w-full h-10.5 px-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
          </div>
        </div>

        {/* Row 3: Service Required & Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Service Required <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.serviceRequired}
                onChange={(e) => handleFieldChange("serviceRequired", e.target.value)}
                className="w-full h-10.5 px-3.5 pr-9 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium appearance-none focus:outline-none focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                {SERVICE_REQUIRED_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Budget Range <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative">
              <select
                value={formData.budgetRange}
                onChange={(e) => handleFieldChange("budgetRange", e.target.value)}
                className="w-full h-10.5 px-3.5 pr-9 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-medium appearance-none focus:outline-none focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
              >
                {BUDGET_RANGE_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Row 4: Project Description */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
            Project / Requirement Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={2.5}
            value={formData.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            onBlur={() => handleBlur("description")}
            placeholder="Briefly describe your requirements, key deliverables, or hiring needs..."
            className={`w-full p-3 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all resize-none ${
              touched.description && fieldErrors.description
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                : "border-slate-200 focus:border-[#0d5cd9] focus:ring-2 focus:ring-blue-500/10"
            }`}
          />
          {touched.description && fieldErrors.description && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.description}</p>
          )}
        </div>

        {/* Row 5: Consent Checkbox */}
        <div className="pt-0.5">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => handleFieldChange("consent", e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0d5cd9] focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-600 leading-tight">
              I consent to Visha IT Solutions processing my contact details in accordance with the{" "}
              <a href="/privacy-policy" target="_blank" className="text-[#0d5cd9] underline hover:text-blue-700 font-medium">
                Privacy Policy
              </a>
              . <span className="text-rose-500">*</span>
            </span>
          </label>
          {touched.consent && fieldErrors.consent && (
            <p className="mt-1 text-[11px] text-rose-500 font-medium">{fieldErrors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11.5 rounded-xl bg-[#0d5cd9] hover:bg-[#0b4eb8] text-white font-bold text-sm tracking-wide shadow-[0_4px_16px_rgba(13,92,217,0.35)] hover:shadow-[0_6px_22px_rgba(13,92,217,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <span>Get a Free Project Quote</span>
            )}
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center pt-0.5">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>Your information is private and protected with 256-bit SSL encryption.</span>
        </div>
      </form>
    </div>
  );
}
