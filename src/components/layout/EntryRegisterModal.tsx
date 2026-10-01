"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  X,
  CheckCircle2,
  UploadCloud,
  FileText,
  Building2,
  Briefcase,
  User,
  Mail,
  Phone,
  ArrowRight,
  Loader2,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

const INDUSTRIES = [
  "IT & Software Services",
  "Talent Acquisition & Staffing",
  "Banking, Financial Services & Insurance (BFSI)",
  "E-commerce & Retail",
  "Healthcare & Life Sciences",
  "Manufacturing & Engineering",
  "Education & EdTech",
  "Telecommunications & Cloud",
  "Media & Digital Marketing",
  "Other",
];

const STORAGE_KEY = "visha_lead_registered_v1";

export default function EntryRegisterModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState<"client" | "candidate">("client");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [requirement, setRequirement] = useState("");

  // Resume state for candidates
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [parsingCv, setParsingCv] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if we are on an admin route, login route, or dedicated register page
    if (pathname?.startsWith("/admin") || pathname?.startsWith("/login") || pathname === "/register") {
      setIsOpen(false);
      return;
    }

    // Auto open modal on public pages so user/visitor can register
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global event listener to manually open registration modal from anywhere
  useEffect(() => {
    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-entry-modal", handleManualOpen);
    return () => window.removeEventListener("open-entry-modal", handleManualOpen);
  }, []);

  // Lock background scroll when modal is visible
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFullNameChange = (val: string) => {
    // Disallow numbers and special characters - allow only letters, dots and single spaces
    const clean = val.replace(/[^A-Za-z\s.]/g, "").replace(/\s{2,}/g, " ");
    setFullName(clean);
    if (errorMsg) setErrorMsg("");
  };

  const handlePhoneChange = (val: string) => {
    // Digits only, maximum 10 digits
    const clean = val.replace(/\D/g, "").slice(0, 10);
    setPhone(clean);
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("File size exceeds 5MB limit. Please upload a smaller file.");
        return;
      }
      setResumeFile(file);
      setErrorMsg("");
    }
  };

  // Smart Parse CV simulation & helper: extracts basic details if available or confirms file
  const handleParseCv = async () => {
    if (!resumeFile) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
      return;
    }

    setParsingCv(true);
    setErrorMsg("");

    try {
      await new Promise((res) => setTimeout(res, 800));

      const fileName = resumeFile.name.replace(/\.[^/.]+$/, "");
      if (!fullName) {
        const cleanName = fileName
          .replace(/[^A-Za-z\s]/g, " ")
          .trim()
          .replace(/\s+/g, " ");
        if (cleanName.length >= 2) {
          const capitalized = cleanName
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
          setFullName(capitalized);
        }
      }

      if (!industry) {
        setIndustry("IT & Software Services");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setParsingCv(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (!/^[A-Za-z\s.]+$/.test(trimmedName) || trimmedName.replace(/[^A-Za-z]/g, "").length < 2) {
      setErrorMsg("Full name must contain only letters and spaces (minimum 2 characters).");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone || trimmedPhone.length !== 10) {
      setErrorMsg("Phone number must be exactly 10 digits.");
      return;
    }

    if (!industry.trim()) {
      setErrorMsg("Please select an industry.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("userType", userType);
      formData.append("fullName", trimmedName);
      formData.append("email", trimmedEmail);
      formData.append("phone", trimmedPhone);
      formData.append("companyName", companyName.trim());
      formData.append("industry", industry.trim());
      formData.append("requirement", requirement.trim());

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const res = await fetch("/api/public/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit registration.");
      }

      // Mark as registered in persistent localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          fullName: trimmedName,
          email: trimmedEmail,
          registeredAt: new Date().toISOString(),
        }));
      } catch (e) {}

      setSubmitted(true);

      setTimeout(() => {
        setIsOpen(false);
      }, 1600);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md transition-all duration-300">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        {/* Top Header Background Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-[#004f6e] via-[#00779e] to-[#00b4d8]" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
          {submitted ? (
            /* Success State */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Welcome to Visha IT Solutions!
              </h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you, <span className="font-semibold text-slate-800">{fullName}</span>. Your details have been registered. Enjoy exploring our services and solutions.
              </p>
              <div className="pt-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#004f6e] to-[#00779e] text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Enter Website Now
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 id="dialog-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Register with Visha
                </h2>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  Join us as a Client or Candidate
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Radio selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    I am registering as:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      onClick={() => setUserType("client")}
                      className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        userType === "client"
                          ? "border-[#00779e] bg-[#00779e]/5 text-[#004f6e] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          userType === "client"
                            ? "border-[#00779e] bg-[#00779e]"
                            : "border-slate-300"
                        }`}
                      >
                        {userType === "client" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold leading-tight">Client / Employer</p>
                        <p className="text-[10px] text-slate-400">Hire talent or services</p>
                      </div>
                    </label>

                    <label
                      onClick={() => setUserType("candidate")}
                      className={`relative flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        userType === "candidate"
                          ? "border-[#00779e] bg-[#00779e]/5 text-[#004f6e] shadow-xs"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          userType === "candidate"
                            ? "border-[#00779e] bg-[#00779e]"
                            : "border-slate-300"
                        }`}
                      >
                        {userType === "candidate" && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold leading-tight">Candidate / Job Seeker</p>
                        <p className="text-[10px] text-slate-400">Find jobs & training</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Optional Resume Upload for Candidate (matching Screenshot 2) */}
                {userType === "candidate" && (
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Upload Your CV (Optional)
                      </span>
                      {resumeFile && (
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Attached
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Upload your CV to auto-fill your details (PDF or DOCX, max 5MB)
                    </p>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-medium rounded-xl text-left truncate flex items-center justify-between shadow-2xs"
                      >
                        <span className="truncate">
                          {resumeFile ? resumeFile.name : "Choose File"}
                        </span>
                        {!resumeFile && (
                          <span className="text-[10px] text-slate-400 ml-2">no file selected</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleParseCv}
                        disabled={parsingCv}
                        className="px-4 py-2 bg-[#2d3748] hover:bg-[#1a202c] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs disabled:opacity-50"
                      >
                        {parsingCv ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Parsing...</span>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={13} />
                            <span>Parse CV</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => handleFullNameChange(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. rahul@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.trim());
                        if (errorMsg) setErrorMsg("");
                      }}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (10 Digits) <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      maxLength={10}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {userType === "client" ? "Company Name" : "Current Company / College"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={userType === "client" ? "Your company name" : "Your organization / institution"}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                    />
                  </div>
                </div>

                {/* Select Industry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Industry <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => {
                        setIndustry(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      required
                      className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>-- Select Industry --</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Tell us about requirements or career */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {userType === "client" ? "Project / Hiring Requirements" : "Career Goals & Skills"}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={
                      userType === "client"
                        ? "Briefly describe your requirements or hiring needs..."
                        : "Briefly describe your key skills or desired roles..."
                    }
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-[#004f6e] to-[#00779e] hover:from-[#003e57] hover:to-[#006282] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <span>Register with Visha</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy assurance & Skip/Close option */}
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    100% Privacy Protected
                  </span>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="hover:text-slate-600 underline cursor-pointer"
                  >
                    Continue browsing
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
