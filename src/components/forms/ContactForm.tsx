"use client";

import { useState } from "react";
import {
  validateContactField,
  ContactFormValues,
} from "@/validators/contactValidator";
import { submitContactEnquiry } from "@/handlers/enquiryHandlers";
import { CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormValues>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof ContactFormValues, boolean>>({
    fullName: false,
    email: false,
    subject: false,
    message: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<keyof ContactFormValues, string | null>>({
    fullName: null,
    email: null,
    subject: null,
    message: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof ContactFormValues, value: string) => {
    let sanitized = value;

    if (field === "fullName") {
      // Allow only letters and spaces; block numbers and special characters completely
      sanitized = value
        .replace(/[^A-Za-z ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 50);
    } else if (field === "email") {
      // Block spaces and disallowed characters
      let clean = value.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._+-]/g, "");
      const atIndex = clean.indexOf("@");
      if (atIndex !== -1) {
        clean = clean.slice(0, atIndex + 1) + clean.slice(atIndex + 1).replace(/@/g, "");
      }
      sanitized = clean.slice(0, 254);
    } else if (field === "subject") {
      // Block all special characters; allow letters, numbers, and single spaces only
      sanitized = value
        .replace(/[^A-Za-z0-9 ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 100);
    } else if (field === "message") {
      // Block HTML/script tag angle brackets
      sanitized = value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").slice(0, 1000);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitized }));

    // If already touched, validate live so error clears immediately upon correction
    if (touched[field]) {
      const error = validateContactField(field, sanitized);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof ContactFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateContactField(field, formData[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Mark all fields as touched
    const allTouched: Record<keyof ContactFormValues, boolean> = {
      fullName: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const nameErr = validateContactField("fullName", formData.fullName);
    const emailErr = validateContactField("email", formData.email);
    const subjectErr = validateContactField("subject", formData.subject);
    const messageErr = validateContactField("message", formData.message);

    const errors = {
      fullName: nameErr,
      email: emailErr,
      subject: subjectErr,
      message: messageErr,
    };
    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((err) => err !== null);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Backend validation & persistence via Server Action
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName.trim());
      submitData.append("email", formData.email.trim());
      submitData.append("subject", formData.subject.trim());
      submitData.append("message", formData.message.trim());

      const res = await submitContactEnquiry(submitData);

      if (!res.success && res.errors) {
        setFieldErrors({
          fullName: res.errors.fullName?.[0] || null,
          email: res.errors.email?.[0] || null,
          subject: res.errors.subject?.[0] || null,
          message: res.errors.message?.[0] || null,
        });
        setGeneralError(res.message || "Please fix the errors before submitting.");
        setIsSubmitting(false);
        return;
      }

      // WhatsApp redirection
      const phoneNumber = "917036592351";
      const text = `Hello Visha IT Solutions,%0A%0A*Name:* ${encodeURIComponent(
        formData.fullName.trim()
      )}%0A*Email:* ${encodeURIComponent(
        formData.email.trim()
      )}%0A*Subject:* ${encodeURIComponent(
        formData.subject.trim()
      )}%0A*Message:* ${encodeURIComponent(formData.message.trim())}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }

      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
      setTouched({
        fullName: false,
        email: false,
        subject: false,
        message: false,
      });
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50/70 p-8 rounded-2xl border border-emerald-100 text-center flex flex-col items-center justify-center min-h-[340px]">
        <CheckCircle2 className="text-emerald-500 w-16 h-16 mb-4" />
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
        <p className="text-slate-600 text-base max-w-sm mx-auto mb-6">
          Thank you for reaching out. A senior solutions consultant will connect with you shortly.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="text-xs font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] hover:underline cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3 sm:space-y-3.5">
      {generalError && (
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100 flex items-center gap-1.5">
          <AlertCircle size={14} className="shrink-0 text-rose-500" />
          <span>{generalError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
        {/* Full Name */}
        <div>
          <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            Full Name <span className="text-rose-500 font-bold ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            maxLength={50}
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
              // Restrict to letters A-Z, a-z only (no numbers, no special characters)
              if (!/^[A-Za-z]$/.test(e.key)) {
                e.preventDefault();
              }
            }}
            onChange={(e) => handleFieldChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            placeholder="John Doe"
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

        {/* Email Address */}
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
            placeholder="john@example.com"
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
      </div>

      {/* Subject */}
      <div>
        <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
          Subject <span className="text-rose-500 font-bold ml-0.5">*</span>
        </label>
        <input
          type="text"
          maxLength={100}
          value={formData.subject}
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
            // Restrict to letters and numbers only (block special characters)
            if (!/^[A-Za-z0-9]$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => handleFieldChange("subject", e.target.value)}
          onBlur={() => handleBlur("subject")}
          placeholder="How can we help?"
          className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
            touched.subject && fieldErrors.subject
              ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
              : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
          }`}
        />
        {touched.subject && fieldErrors.subject && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
            <AlertCircle size={12} className="shrink-0" />
            {fieldErrors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
          Message <span className="text-rose-500 font-bold ml-0.5">*</span>
        </label>
        <textarea
          rows={3}
          maxLength={1000}
          value={formData.message}
          onKeyDown={(e) => {
            // Block HTML / script tag brackets
            if (e.key === "<" || e.key === ">") {
              e.preventDefault();
            }
          }}
          onChange={(e) => handleFieldChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          placeholder="Describe your requirements or inquiry..."
          className={`w-full p-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs resize-none ${
            touched.message && fieldErrors.message
              ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
              : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
          }`}
        />
        {touched.message && fieldErrors.message && (
          <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
            <AlertCircle size={12} className="shrink-0" />
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 sm:h-11.5 rounded-xl bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,30%)] hover:from-[hsl(195,100%,18%)] hover:to-[hsl(195,100%,26%)] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(0,105,148,0.25)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send size={15} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
