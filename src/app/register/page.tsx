"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  UploadCloud,
  Loader2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  UserCheck,
  Building2,
  Briefcase
} from "lucide-react";
import SlideUp from "@/components/animations/SlideUp";
import FadeIn from "@/components/animations/FadeIn";

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

export default function RegisterPage() {
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

  // Smart Parse CV simulation
  const handleParseCv = async () => {
    if (!resumeFile) {
      fileInputRef.current?.click();
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
      setErrorMsg("Full name must contain only letters and spaces (no numbers or special characters).");
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

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            fullName: trimmedName,
            email: trimmedEmail,
            registeredAt: new Date().toISOString(),
          })
        );
      } catch (e) {}

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800">
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative w-full py-16 sm:py-24 bg-[#061424] overflow-hidden text-white border-b border-slate-800">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-[#00779e]/20 rounded-full blur-[160px] pointer-events-none" />

        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold tracking-widest uppercase mb-4 border border-white/15">
              <UserCheck size={14} className="text-cyan-400" />
              <span>OFFICIAL REGISTRATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4">
              Register with{" "}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Visha IT Solutions
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-300/90 leading-relaxed">
              Connect with us as an enterprise Client or talented Candidate to access bespoke software engineering, global recruitment, and industry training.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Form Section ──────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 -mt-8 relative z-20">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <SlideUp>
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10 relative overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-[#004f6e] via-[#00779e] to-[#00b4d8] absolute top-0 left-0" />

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Registration Completed!
                  </h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-800">{fullName}</span>. Your details have been successfully recorded in our system. Our executive team will connect with you shortly.
                  </p>
                  <div className="pt-6 flex items-center justify-center gap-4">
                    <Link
                      href="/"
                      className="px-6 py-3 bg-gradient-to-r from-[#004f6e] to-[#00779e] text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                    >
                      <span>Explore Home</span>
                      <ArrowRight size={15} />
                    </Link>
                    <Link
                      href="/services"
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-all"
                    >
                      View Services
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Join Our Global Network
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Fill out the form below. All mandatory fields are marked with{" "}
                      <span className="text-red-500 font-bold">*</span>
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {/* User Type Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        I am registering as: <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          onClick={() => setUserType("client")}
                          className={`relative flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            userType === "client"
                              ? "border-[#00779e] bg-[#00779e]/5 text-[#004f6e] shadow-xs ring-2 ring-[#00779e]/20"
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
                          <div>
                            <p className="text-xs font-bold leading-tight">Client / Employer</p>
                            <p className="text-[10px] text-slate-400">Hire talent or services</p>
                          </div>
                        </label>

                        <label
                          onClick={() => setUserType("candidate")}
                          className={`relative flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            userType === "candidate"
                              ? "border-[#00779e] bg-[#00779e]/5 text-[#004f6e] shadow-xs ring-2 ring-[#00779e]/20"
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
                          <div>
                            <p className="text-xs font-bold leading-tight">Candidate / Job Seeker</p>
                            <p className="text-[10px] text-slate-400">Find jobs & training</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Resume Upload for Candidate */}
                    {userType === "candidate" && (
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
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
                            className="flex-1 px-3.5 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-medium rounded-xl text-left truncate flex items-center justify-between shadow-2xs"
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
                            className="px-4 py-2.5 bg-[#2d3748] hover:bg-[#1a202c] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs disabled:opacity-50"
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
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={(e) => handleFullNameChange(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. rahul@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value.trim());
                            if (errorMsg) setErrorMsg("");
                          }}
                          required
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (10 Digits) <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={phone}
                          maxLength={10}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          required
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company & Industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {userType === "client" ? "Company Name" : "Current Company / College"}
                        </label>
                        <input
                          type="text"
                          placeholder={userType === "client" ? "Your company name" : "Your organization / institution"}
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all"
                        />
                      </div>

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
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all appearance-none cursor-pointer"
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
                    </div>

                    {/* Requirements / Career Goals */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {userType === "client" ? "Project Scope / Hiring Needs" : "Career Goals & Desired Roles"}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={
                          userType === "client"
                            ? "Briefly describe your project requirements, tech stack, or hiring timeline..."
                            : "Briefly describe your key technology skills, certifications, or desired roles..."
                        }
                        value={requirement}
                        onChange={(e) => setRequirement(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e] focus:ring-2 focus:ring-[#00779e]/10 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-4 px-6 bg-gradient-to-r from-[#004f6e] to-[#00779e] hover:from-[#003e57] hover:to-[#006282] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#004f6e]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Submitting Registration...</span>
                          </>
                        ) : (
                          <>
                            <span>Complete Registration</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>Your information is protected with enterprise-grade encryption.</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
