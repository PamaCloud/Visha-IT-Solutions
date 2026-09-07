"use client";

import { useState, useRef, useMemo } from "react";
import {
  CAREER_POSITION_OPTIONS,
  CAREER_EXPERIENCE_OPTIONS,
  CareerFormValues,
  validateCareerField,
} from "@/validators/careerValidator";
import { submitJobApplication } from "@/handlers/jobHandlers";
import {
  CheckCircle2,
  Loader2,
  UploadCloud,
  AlertCircle,
  FileText,
  X,
  ChevronDown,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";

export interface JobContext {
  title: string;
  department?: string;
  location?: string;
  type?: string;
  experience?: string;
  slug?: string;
}

interface Props {
  defaultPosition?: string;
  availablePositions?: string[];
  jobContext?: JobContext;
}

export default function CareerApplicationForm({
  defaultPosition = "",
  availablePositions = [],
  jobContext,
}: Props) {
  const initialPosition = jobContext?.title || defaultPosition || "";

  const [formData, setFormData] = useState<CareerFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentCompany: "",
    linkedin: "",
    portfolio: "",
    position: initialPosition,
    experienceLevel: "",
    coverLetter: "",
  });

  const [customExperience, setCustomExperience] = useState("");
  const [customExpError, setCustomExpError] = useState<string | null>(null);

  const positionOptions = useMemo(() => {
    const list = new Set<string>();
    if (jobContext?.title) list.add(jobContext.title);
    if (defaultPosition) list.add(defaultPosition);
    if (availablePositions && availablePositions.length > 0) {
      availablePositions.forEach((p) => {
        if (p?.trim()) list.add(p.trim());
      });
    }
    CAREER_POSITION_OPTIONS.forEach((p) => list.add(p));
    return Array.from(list);
  }, [defaultPosition, jobContext, availablePositions]);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [touched, setTouched] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    currentCompany: false,
    linkedin: false,
    portfolio: false,
    position: false,
    experienceLevel: false,
    coverLetter: false,
    resume: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string | null>>({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    currentCompany: null,
    linkedin: null,
    portfolio: null,
    position: null,
    experienceLevel: null,
    coverLetter: null,
    resume: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof CareerFormValues, value: string) => {
    let sanitized = value;

    if (field === "firstName") {
      // Letters only, NO SPACES allowed (single name token), max 40
      sanitized = value.replace(/[^A-Za-z]/g, "").slice(0, 40);
    } else if (field === "lastName") {
      // Letters and single spaces only, max 40
      sanitized = value
        .replace(/[^A-Za-z ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 40);
    } else if (field === "email") {
      // No spaces, single @, valid email chars only, max 254
      let clean = value.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._+-]/g, "");
      const atIndex = clean.indexOf("@");
      if (atIndex !== -1) {
        clean = clean.slice(0, atIndex + 1) + clean.slice(atIndex + 1).replace(/@/g, "");
      }
      sanitized = clean.slice(0, 254);
    } else if (field === "phone") {
      // Digits only, max 10
      sanitized = value.replace(/\D/g, "").slice(0, 10);
    } else if (field === "currentCompany") {
      // Standard corporate chars, max 100
      sanitized = value
        .replace(/[^A-Za-z0-9&.,\- ]/g, "")
        .replace(/^\s+/, "")
        .replace(/\s{2,}/g, " ")
        .slice(0, 100);
    } else if (field === "linkedin") {
      // No spaces
      sanitized = value.replace(/\s/g, "").slice(0, 150);
    } else if (field === "portfolio") {
      // No spaces, max 200
      sanitized = value.replace(/\s/g, "").slice(0, 200);
    } else if (field === "coverLetter") {
      // Block HTML angle brackets, max 2000
      sanitized = value.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").slice(0, 2000);
    }

    setFormData((prev) => ({ ...prev, [field]: sanitized }));

    if (touched[field]) {
      const error = validateCareerField(field, sanitized);
      setFieldErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof CareerFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateCareerField(field, formData[field]);
    setFieldErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFileSelected = (file: File | null) => {
    setResumeFile(file);
    setTouched((prev) => ({ ...prev, resume: true }));
    const error = validateCareerField("resume", undefined, file);
    setFieldErrors((prev) => ({ ...prev, resume: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Mark all touched
    const allTouched: Record<string, boolean> = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      currentCompany: true,
      linkedin: true,
      portfolio: true,
      position: true,
      experienceLevel: true,
      coverLetter: true,
      resume: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const errors: Record<string, string | null> = {
      firstName: validateCareerField("firstName", formData.firstName),
      lastName: validateCareerField("lastName", formData.lastName),
      email: validateCareerField("email", formData.email),
      phone: validateCareerField("phone", formData.phone),
      currentCompany: validateCareerField("currentCompany", formData.currentCompany),
      linkedin: validateCareerField("linkedin", formData.linkedin),
      portfolio: validateCareerField("portfolio", formData.portfolio),
      position: validateCareerField("position", formData.position),
      experienceLevel: validateCareerField("experienceLevel", formData.experienceLevel),
      coverLetter: validateCareerField("coverLetter", formData.coverLetter),
      resume: validateCareerField("resume", undefined, resumeFile),
    };

    setFieldErrors(errors);

    // If 'Other' experience is selected, validate custom text
    if (formData.experienceLevel === "Other") {
      if (!customExperience.trim() || customExperience.trim().length < 2) {
        setCustomExpError("Please specify your experience level (e.g., '3.5 Years in React' or 'Freelance 2y').");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName.trim());
      submitData.append("lastName", formData.lastName.trim());
      submitData.append("email", formData.email.trim());
      submitData.append("phone", formData.phone);
      if (formData.currentCompany?.trim()) {
        submitData.append("currentCompany", formData.currentCompany.trim());
      }
      if (formData.linkedin?.trim()) {
        submitData.append("linkedin", formData.linkedin.trim());
      }
      if (formData.portfolio?.trim()) {
        submitData.append("portfolio", formData.portfolio.trim());
      }
      submitData.append("position", formData.position);
      
      const resolvedExperience =
        formData.experienceLevel === "Other"
          ? customExperience.trim().toLowerCase().startsWith("other")
            ? customExperience.trim()
            : `Other: ${customExperience.trim()}`
          : formData.experienceLevel;
      submitData.append("experienceLevel", resolvedExperience);

      if (formData.coverLetter?.trim()) {
        submitData.append("coverLetter", formData.coverLetter.trim());
      }
      if (resumeFile) {
        submitData.append("resume", resumeFile);
      }

      const res = await submitJobApplication(submitData);

      if (!res.success && res.errors) {
        const mappedErrors: Record<string, string | null> = {};
        Object.entries(res.errors).forEach(([k, v]) => {
          mappedErrors[k] = Array.isArray(v) ? v[0] : (v as string);
        });
        setFieldErrors((prev) => ({ ...prev, ...mappedErrors }));
        setGeneralError(res.message || "Please resolve the highlighted errors.");
        setIsSubmitting(false);
        return;
      }

      // WhatsApp redirection
      const phoneNumber = "919014646804";
      const text = `*New Career Application - Visha IT Solutions*%0A%0A*Name:* ${encodeURIComponent(
        `${formData.firstName.trim()} ${formData.lastName.trim()}`
      )}%0A*Position:* ${encodeURIComponent(
        formData.position
      )}%0A*Experience Level:* ${encodeURIComponent(
        resolvedExperience
      )}%0A*Mobile:* +91 ${encodeURIComponent(
        formData.phone
      )}%0A*Email:* ${encodeURIComponent(
        formData.email.trim()
      )}%0A*Company:* ${encodeURIComponent(
        formData.currentCompany?.trim() || "N/A"
      )}%0A*Resume Attached:* ${encodeURIComponent(resumeFile?.name || "Uploaded")}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

      if (typeof window !== "undefined") {
        window.open(whatsappUrl, "_blank");
      }

      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentCompany: "",
        linkedin: "",
        portfolio: "",
        position: initialPosition,
        experienceLevel: "",
        coverLetter: "",
      });
      setCustomExperience("");
      setCustomExpError(null);
      setResumeFile(null);
    } catch {
      setGeneralError("An unexpected error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50/70 p-8 sm:p-12 rounded-3xl border border-emerald-100 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-xs">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">Application Submitted!</h3>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for applying. Our talent acquisition team has received your application and will review your profile within 3–5 business days.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="text-xs font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] hover:underline cursor-pointer"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {generalError && (
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold border border-rose-100 flex items-center gap-1.5">
          <AlertCircle size={14} className="shrink-0 text-rose-500" />
          <span>{generalError}</span>
        </div>
      )}

      {/* ── Dynamic Job Post Banner (When applying for a specific post) ── */}
      {jobContext && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[hsl(195,100%,25%)]/5 via-sky-50/70 to-cyan-50/40 border border-sky-100/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[hsl(195,100%,25%)] bg-[hsl(195,100%,25%)]/10 px-2.5 py-0.5 rounded-full inline-block">
                Applying For Position
              </span>
              {jobContext.type && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/60 px-2 py-0.5 rounded-full">
                  {jobContext.type}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {jobContext.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-semibold text-slate-600">
              {jobContext.department && (
                <span className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-1">
                  <Briefcase size={13} className="text-slate-400" />
                  {jobContext.department}
                </span>
              )}
              {jobContext.location && (
                <span className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-1">
                  <MapPin size={13} className="text-cyan-500" />
                  {jobContext.location}
                </span>
              )}
              {jobContext.experience && (
                <span className="px-2.5 py-1 rounded-lg bg-white/90 border border-sky-200 text-[hsl(195,100%,25%)] shadow-2xs flex items-center gap-1 font-bold">
                  <Clock size={13} className="text-[hsl(195,100%,25%)]" />
                  Required: {jobContext.experience}
                </span>
              )}
            </div>
          </div>

          {jobContext.slug && (
            <a
              href={`/careers/${jobContext.slug}`}
              className="text-xs font-bold text-[hsl(195,100%,25%)] hover:text-cyan-700 hover:underline shrink-0 flex items-center gap-1 self-start sm:self-center"
            >
              View Full Job Description &rarr;
            </a>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
        {/* ── LEFT COLUMN: PERSONAL INFORMATION ── */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[hsl(195,100%,25%)] uppercase tracking-wider border-b border-slate-100 pb-2">
            Personal Information
          </h4>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* First Name */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                First Name <span className="text-rose-500 font-bold ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                maxLength={40}
                onKeyDown={(e) => {
                  if (
                    e.ctrlKey ||
                    e.metaKey ||
                    ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                  ) {
                    return;
                  }
                  // No spaces allowed for First Name (single name token)
                  if (e.key === " " || !/^[A-Za-z]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
                placeholder="John"
                className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                  touched.firstName && fieldErrors.firstName
                    ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                    : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                }`}
              />
              {touched.firstName && fieldErrors.firstName && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Last Name <span className="text-rose-500 font-bold ml-0.5">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                maxLength={40}
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
                onChange={(e) => handleFieldChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
                placeholder="Doe"
                className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                  touched.lastName && fieldErrors.lastName
                    ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                    : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                }`}
              />
              {touched.lastName && fieldErrors.lastName && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email Address & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                  if (e.key === " ") {
                    e.preventDefault();
                    return;
                  }
                  if (e.key === "@" && e.currentTarget.value.includes("@")) {
                    e.preventDefault();
                    return;
                  }
                  if (!/^[a-zA-Z0-9._+@-]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="john.doe@example.com"
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

            {/* Phone Number */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Phone Number <span className="text-rose-500 font-bold ml-0.5">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="w-13 sm:w-15 h-11 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-xs sm:text-sm shrink-0 select-none">
                  +91
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={formData.phone}
                  onKeyDown={(e) => {
                    if (
                      e.ctrlKey ||
                      e.metaKey ||
                      ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                    ) {
                      return;
                    }
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                      return;
                    }
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
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="10-digit mobile number"
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                    touched.phone && fieldErrors.phone
                      ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                      : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                  }`}
                />
              </div>
              {touched.phone && fieldErrors.phone && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Current Company (Optional) */}
          <div>
            <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Current Company <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>
            <input
              type="text"
              maxLength={100}
              value={formData.currentCompany}
              onKeyDown={(e) => {
                if (
                  e.ctrlKey ||
                  e.metaKey ||
                  ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
                ) {
                  return;
                }
                if (!/^[A-Za-z0-9&.,\- ]$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleFieldChange("currentCompany", e.target.value)}
              onBlur={() => handleBlur("currentCompany")}
              placeholder="Current company name"
              className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                touched.currentCompany && fieldErrors.currentCompany
                  ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
              }`}
            />
            {touched.currentCompany && fieldErrors.currentCompany && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                {fieldErrors.currentCompany}
              </p>
            )}
          </div>

          {/* LinkedIn & Portfolio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* LinkedIn Profile */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                LinkedIn Profile <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <input
                type="url"
                maxLength={150}
                value={formData.linkedin}
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
                onChange={(e) => handleFieldChange("linkedin", e.target.value)}
                onBlur={() => handleBlur("linkedin")}
                placeholder="https://linkedin.com/in/..."
                className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                  touched.linkedin && fieldErrors.linkedin
                    ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                    : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                }`}
              />
              {touched.linkedin && fieldErrors.linkedin && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.linkedin}
                </p>
              )}
            </div>

            {/* Portfolio / Website */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Portfolio / Website <span className="text-slate-400 font-normal normal-case">(Optional)</span>
              </label>
              <input
                type="url"
                maxLength={200}
                value={formData.portfolio}
                onKeyDown={(e) => {
                  if (e.key === " ") e.preventDefault();
                }}
                onChange={(e) => handleFieldChange("portfolio", e.target.value)}
                onBlur={() => handleBlur("portfolio")}
                placeholder="https://yourportfolio.com"
                className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                  touched.portfolio && fieldErrors.portfolio
                    ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                    : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                }`}
              />
              {touched.portfolio && fieldErrors.portfolio && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.portfolio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: APPLICATION DETAILS ── */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-[hsl(195,100%,25%)] uppercase tracking-wider border-b border-slate-100 pb-2">
            Application Details
          </h4>

          {/* Position & Experience Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Position */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Position <span className="text-rose-500 font-bold ml-0.5">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.position}
                  onChange={(e) => handleFieldChange("position", e.target.value)}
                  onBlur={() => handleBlur("position")}
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer pr-9 shadow-2xs ${
                    touched.position && fieldErrors.position
                      ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                      : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                  }`}
                >
                  <option value="" disabled>
                    Select a position
                  </option>
                  {positionOptions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              {touched.position && fieldErrors.position && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.position}
                </p>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
                Experience Level <span className="text-rose-500 font-bold ml-0.5">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => {
                    handleFieldChange("experienceLevel", e.target.value);
                    if (e.target.value !== "Other") {
                      setCustomExpError(null);
                    }
                  }}
                  onBlur={() => handleBlur("experienceLevel")}
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer pr-9 shadow-2xs ${
                    touched.experienceLevel && fieldErrors.experienceLevel
                      ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                      : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
                  }`}
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  {CAREER_EXPERIENCE_OPTIONS.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              {touched.experienceLevel && fieldErrors.experienceLevel && (
                <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {fieldErrors.experienceLevel}
                </p>
              )}

              {/* Dynamic input field when user selects 'Other' experience */}
              {formData.experienceLevel === "Other" && (
                <div className="mt-3 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/90 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[hsl(195,100%,25%)] mb-1 block">
                    Specify Your Experience <span className="text-rose-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={customExperience}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomExperience(val);
                      if (customExpError && val.trim().length >= 2) {
                        setCustomExpError(null);
                      }
                    }}
                    onBlur={() => {
                      if (!customExperience.trim() || customExperience.trim().length < 2) {
                        setCustomExpError("Please specify your experience level (e.g., '3.5 Years in React' or 'Freelance 2y').");
                      } else {
                        setCustomExpError(null);
                      }
                    }}
                    placeholder="e.g., 3.5 Years, Freelancer (2 Years), Student, 10+ Years"
                    className={`w-full h-10 px-3 rounded-lg border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs ${
                      customExpError
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                        : "border-slate-300 focus:border-[hsl(195,100%,25%)] focus:ring-2 focus:ring-[hsl(195,100%,25%)]/10"
                    }`}
                  />
                  {customExpError && (
                    <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                      <AlertCircle size={12} className="shrink-0" />
                      {customExpError}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-slate-500">
                    Not listed above? Type your exact experience or background here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Resume/CV Upload Area */}
          <div>
            <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Resume/CV <span className="text-rose-500 font-bold ml-0.5">*</span>
            </label>

            {resumeFile ? (
              <div className="h-28 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[220px]">
                      {resumeFile.name}
                    </p>
                    <p className="text-[10.5px] text-slate-500">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready to upload
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleFileSelected(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Remove file"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleFileSelected(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? "border-[hsl(195,100%,25%)] bg-[hsl(195,100%,25%)]/5"
                    : touched.resume && fieldErrors.resume
                    ? "border-rose-300 bg-rose-50/30"
                    : "border-slate-200 bg-slate-50/50 hover:bg-cyan-50/50 hover:border-[hsl(190,100%,45%)]"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center mx-auto mb-1.5 text-[hsl(195,100%,25%)]">
                  <UploadCloud size={17} />
                </div>
                <p className="text-xs font-bold text-[hsl(195,100%,25%)] mb-0.5">
                  Click to upload or drag &amp; drop
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  PDF, DOC, DOCX up to 10MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileSelected(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
              </div>
            )}

            {touched.resume && fieldErrors.resume && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                {fieldErrors.resume}
              </p>
            )}
          </div>

          {/* Cover Letter (Optional) */}
          <div>
            <label className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">
              Cover Letter <span className="text-slate-400 font-normal normal-case">(Optional)</span>
            </label>
            <textarea
              rows={3}
              maxLength={2000}
              value={formData.coverLetter}
              onKeyDown={(e) => {
                if (e.key === "<" || e.key === ">") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => handleFieldChange("coverLetter", e.target.value)}
              onBlur={() => handleBlur("coverLetter")}
              placeholder="Tell us why you'd be a great fit..."
              className={`w-full p-3 rounded-xl border bg-white text-slate-800 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none transition-all shadow-2xs resize-none ${
                touched.coverLetter && fieldErrors.coverLetter
                  ? "border-rose-400 focus:border-rose-500 focus:ring-3 focus:ring-rose-500/10"
                  : "border-slate-200 focus:border-[hsl(195,100%,25%)] focus:ring-3 focus:ring-[hsl(195,100%,25%)]/10"
              }`}
            />
            {touched.coverLetter && fieldErrors.coverLetter && (
              <p className="mt-1 text-[11px] text-rose-500 font-medium flex items-center gap-1">
                <AlertCircle size={12} className="shrink-0" />
                {fieldErrors.coverLetter}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Submit Button (Aligned to bottom right / full width on mobile) ── */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10.5px] text-slate-400 text-center sm:text-left">
          By submitting, you agree to our recruitment team reviewing your credentials.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 h-11.5 sm:h-12 rounded-xl bg-gradient-to-r from-[hsl(195,100%,22%)] via-[#006994] to-[hsl(195,100%,30%)] hover:from-[hsl(195,100%,18%)] hover:to-[hsl(195,100%,26%)] text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(0,105,148,0.25)] hover:shadow-[0_6px_20px_rgba(0,105,148,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application...</span>
            </>
          ) : (
            <span>Submit Application</span>
          )}
        </button>
      </div>
    </form>
  );
}
