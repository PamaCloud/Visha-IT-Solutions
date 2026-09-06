"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface Props {
  onSuccess?: () => void;
  className?: string;
  defaultInquiryType?: string;
}

export default function ClassicQuoteCard({ onSuccess, className = "", defaultInquiryType = "" }: Props) {
  const [fullName, setFullName] = useState("");
  const [profileType, setProfileType] = useState("");
  const [inquiryType, setInquiryType] = useState(defaultInquiryType || "");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!profileType) {
      setErrorMessage("Please select your organisation / profile type.");
      return;
    }
    if (!inquiryType) {
      setErrorMessage("Please select your inquiry type.");
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send message to WhatsApp directly
      const text = `*New Advisory & Quote Request - Visha IT Solutions*%0A%0A*Name:* ${encodeURIComponent(fullName)}%0A*Profile Type:* ${encodeURIComponent(profileType)}%0A*Inquiry Type:* ${encodeURIComponent(inquiryType)}%0A*Mobile:* +91 ${encodeURIComponent(mobileNumber)}%0A*Email:* ${encodeURIComponent(email || "Not Provided")}`;
      const whatsappUrl = `https://wa.me/917036592351?text=${text}`;

      // Open WhatsApp in new tab
      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }

      setIsSuccess(true);
      if (onSuccess) {
        setTimeout(onSuccess, 3000);
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again or reach out directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-8 sm:p-10 text-center flex flex-col items-center justify-center min-h-[420px] ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
          Request Received!
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed mb-6 font-normal">
          Thank you, <strong className="text-slate-800">{fullName}</strong>. Our enterprise solutions team has received your enquiry and will call you back within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setFullName("");
            setProfileType("");
            setInquiryType("");
            setMobileNumber("");
            setEmail("");
          }}
          className="text-xs font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] hover:underline"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-7 sm:p-10 w-full max-w-xl mx-auto ${className}`}
    >
      {/* Form Header */}
      <div className="mb-7">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
          Get Advisory & Project Quote
        </h2>
        <p className="text-sm text-slate-500 font-normal leading-relaxed">
          Share your details — our technical solutions expert will call you back.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* YOUR NAME */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Your Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g., John Doe"
            required
            className="w-full h-12 sm:h-13 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
          />
        </div>

        {/* PROFILE TYPE */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Profile Type
          </label>
          <div className="relative">
            <select
              value={profileType}
              onChange={(e) => setProfileType(e.target.value)}
              required
              className="w-full h-12 sm:h-13 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all appearance-none cursor-pointer pr-10 shadow-2xs"
            >
              <option value="" disabled>
                Select organisation type
              </option>
              <option value="Enterprise / Corporate">Enterprise / Corporate</option>
              <option value="SME / Growing Business">SME / Growing Business</option>
              <option value="Startup">Startup</option>
              <option value="Educational / University">Educational / University</option>
              <option value="Individual / Professional">Individual / Professional</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* INQUIRY TYPE */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Inquiry Type
          </label>
          <div className="relative">
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              required
              className="w-full h-12 sm:h-13 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all appearance-none cursor-pointer pr-10 shadow-2xs"
            >
              <option value="" disabled>
                Select inquiry type
              </option>
              <option value="Software Development & Cloud Solutions">
                Software Development & Cloud Solutions
              </option>
              <option value="IT Training Programs (Python / MERN / .NET)">
                IT Training Programs (Python / MERN / .NET)
              </option>
              <option value="Recruitment & Staffing Solutions">
                Recruitment & Staffing Solutions
              </option>
              <option value="Talent Acquisition Services">
                Talent Acquisition Services
              </option>
              <option value="Payroll & HR Management Services">
                Payroll & HR Management Services
              </option>
              <option value="Digital Marketing & Brand Growth">
                Digital Marketing & Brand Growth
              </option>
              <option value="E-Commerce Ecosystem Solutions">
                E-Commerce Ecosystem Solutions
              </option>
              <option value="General Enterprise Consultation">
                General Enterprise Consultation
              </option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        {/* MOBILE NUMBER */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Mobile Number
          </label>
          <div className="flex items-center gap-2.5">
            <div className="w-16 sm:w-20 h-12 sm:h-13 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-sm shrink-0 select-none">
              +91
            </div>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="10-digit mobile number"
              required
              className="w-full h-12 sm:h-13 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* EMAIL ADDRESS (Optional) */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
            Email Address <span className="text-slate-400 normal-case font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., john@example.com"
            className="w-full h-12 sm:h-13 px-4 rounded-2xl border border-slate-200 bg-white text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[hsl(195,100%,25%)] focus:ring-4 focus:ring-[hsl(195,100%,25%)]/10 transition-all shadow-2xs"
          />
        </div>

        {/* CTA SUBMIT BUTTON - In Website Theme Color */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 sm:h-14 rounded-2xl bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,30%)] hover:from-[hsl(195,100%,18%)] hover:to-[hsl(195,100%,26%)] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(0,105,148,0.32)] hover:shadow-[0_12px_32px_rgba(0,105,148,0.44)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <span>Request a Call Back</span>
            )}
          </button>
        </div>

        {/* Disclaimer / Privacy Text */}
        <p className="text-[11px] text-slate-400 leading-relaxed text-center pt-2">
          By submitting, you authorise Visha IT Solutions Pvt. Ltd. to contact you regarding your enquiry. We respect your privacy.
        </p>
      </form>
    </div>
  );
}
