"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  FileText,
  ExternalLink,
  Globe,
  Building,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  CheckCircle2,
  Clock,
  UserCheck,
  XCircle,
  Loader2,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  RefreshCw,
  Sparkles
} from "lucide-react";

export interface CandidateApplication {
  _id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  position?: string;
  experienceLevel?: string;
  currentCompany?: string;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
  resumeUrl: string;
  resumeName?: string;
  status: "New" | "Shortlisted" | "Under Review" | "Interview Scheduled" | "Hired" | "Rejected" | "pending" | "reviewed" | "accepted";
  notes?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string; icon: any }
> = {
  New: {
    label: "New",
    bg: "bg-sky-50",
    text: "text-[#00779e]",
    border: "border-sky-200",
    icon: Sparkles,
  },
  pending: {
    label: "New",
    bg: "bg-sky-50",
    text: "text-[#00779e]",
    border: "border-sky-200",
    icon: Sparkles,
  },
  Shortlisted: {
    label: "Shortlisted",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    icon: UserCheck,
  },
  "Under Review": {
    label: "Under Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: Clock,
  },
  reviewed: {
    label: "Under Review",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: Clock,
  },
  "Interview Scheduled": {
    label: "Interview Scheduled",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: Calendar,
  },
  Hired: {
    label: "Hired",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  accepted: {
    label: "Hired",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  Rejected: {
    label: "Rejected",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: XCircle,
  },
  rejected: {
    label: "Rejected",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: XCircle,
  },
};

export default function CandidatesManager() {
  const [candidates, setCandidates] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);
  
  // Modal state
  const [editingStatus, setEditingStatus] = useState<string>("New");
  const [editingNotes, setEditingNotes] = useState<string>("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");
  const [isCoverLetterExpanded, setIsCoverLetterExpanded] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCandidates(json.data);
      }
    } catch (err) {
      console.error("Failed to load candidates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const openCandidateModal = (candidate: CandidateApplication) => {
    setSelectedCandidate(candidate);
    setEditingStatus(candidate.status || "New");
    setEditingNotes(candidate.notes || "");
    setIsCoverLetterExpanded(false);
    setSaveSuccessMsg("");
  };

  const handleInlineStatusChange = async (
    id: string,
    newStatus: CandidateApplication["status"]
  ) => {
    // Optimistic UI update
    setCandidates((prev) =>
      prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
    );

    try {
      await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update candidate status:", err);
      fetchCandidates();
    }
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedCandidate) return;
    setSavingNotes(true);
    setSaveSuccessMsg("");

    try {
      const res = await fetch(`/api/admin/applications/${selectedCandidate._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editingStatus,
          notes: editingNotes,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setCandidates((prev) =>
          prev.map((item) => (item._id === json.data._id ? json.data : item))
        );
        setSelectedCandidate(json.data);
        setSaveSuccessMsg("Hiring status & HR notes saved successfully!");
        setTimeout(() => setSaveSuccessMsg(""), 3500);
      }
    } catch (err) {
      console.error("Failed to update status & notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteCandidate = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete applicant "${name}"?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setCandidates((prev) => prev.filter((item) => item._id !== id));
        if (selectedCandidate?._id === id) {
          setSelectedCandidate(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete candidate:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((item) => {
      const matchesSearch =
        item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position?.toLowerCase().includes(searchTerm.toLowerCase());

      const normalizedStatus = STATUS_CONFIG[item.status]?.label || item.status;
      const matchesStatus =
        statusFilter === "All" || normalizedStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, searchTerm, statusFilter]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recent";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            Candidates Applications
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-sky-50 text-[#004f6e] border border-sky-100">
              {candidates.length} Total
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming job applications, examine resumes, and manage recruitment pipeline.
          </p>
        </div>

        <button
          onClick={fetchCandidates}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-[#00779e]" : ""} />
          Refresh
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search candidate, email, role, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            "All",
            "New",
            "Shortlisted",
            "Under Review",
            "Interview Scheduled",
            "Hired",
            "Rejected",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? "bg-gradient-to-r from-[#004f6e] to-[#0096c7] text-white shadow-xs font-semibold"
                  : "text-slate-600 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Candidates Table View */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-4 font-semibold">Applied Date</th>
                <th className="py-3.5 px-4 font-semibold">Full Name</th>
                <th className="py-3.5 px-4 font-semibold">Position</th>
                <th className="py-3.5 px-4 font-semibold hidden md:table-cell">Exp Level</th>
                <th className="py-3.5 px-4 font-semibold hidden sm:table-cell">Phone</th>
                <th className="py-3.5 px-4 font-semibold text-center">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading applications...
                  </td>
                </tr>
              ) : filteredCandidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No candidate applications match your filter.
                  </td>
                </tr>
              ) : (
                filteredCandidates.map((candidate) => {
                  const statusInfo =
                    STATUS_CONFIG[candidate.status] || STATUS_CONFIG["New"];
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr
                      key={candidate._id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Applied Date */}
                      <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">
                        {formatDate(candidate.createdAt)}
                      </td>

                      {/* Full Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">
                          {candidate.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {candidate.email}
                        </div>
                      </td>

                      {/* Position */}
                      <td className="py-3.5 px-4 text-slate-700 font-medium">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-sky-50 text-[#004f6e] border border-sky-100 text-[11px] font-medium">
                          {candidate.position || "Applicant"}
                        </span>
                      </td>

                      {/* Exp Level */}
                      <td className="py-3.5 px-4 text-slate-600 hidden md:table-cell whitespace-nowrap">
                        {candidate.experienceLevel || "Fresher (0–1y)"}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] hidden sm:table-cell whitespace-nowrap">
                        <a
                          href={`tel:${candidate.phone}`}
                          className="hover:text-[#00779e] hover:underline"
                        >
                          {candidate.phone}
                        </a>
                      </td>

                      {/* Status Dropdown within the row */}
                      <td className="py-3.5 px-4 text-center">
                        <select
                          value={candidate.status || "New"}
                          onChange={(e) =>
                            handleInlineStatusChange(
                              candidate._id,
                              e.target.value as CandidateApplication["status"]
                            )
                          }
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border transition-all cursor-pointer focus:outline-none ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openCandidateModal(candidate)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#004f6e] text-xs font-semibold rounded-lg border border-sky-200 transition-all cursor-pointer shadow-xs"
                          >
                            <Eye size={13} />
                            View Details
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteCandidate(candidate._id, candidate.fullName)
                            }
                            disabled={deletingId === candidate._id}
                            title="Delete Applicant"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Detailed Applicant Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#004f6e] to-[#0096c7] text-white flex items-center justify-center font-bold text-base shadow-sm">
                  {selectedCandidate.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {selectedCandidate.fullName}
                  </h2>
                  <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-medium text-[#004f6e]">
                      {selectedCandidate.position || "General Candidate"}
                    </span>
                    <span>•</span>
                    <span>Applied on {formatDate(selectedCandidate.createdAt)}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-700 custom-scrollbar">
              
              {/* Personal Info Grid */}
              <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[#00779e]" />
                  Personal &amp; Professional Info
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Full Name</span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {selectedCandidate.fullName}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Current Company</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      <Building size={13} className="text-slate-400" />
                      {selectedCandidate.currentCompany || "Not Specified"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Phone Number</span>
                    <a
                      href={`tel:${selectedCandidate.phone}`}
                      className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5 hover:text-[#00779e] hover:underline"
                    >
                      <Phone size={13} className="text-slate-400" />
                      {selectedCandidate.phone}
                    </a>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Email Address</span>
                    <a
                      href={`mailto:${selectedCandidate.email}`}
                      className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5 hover:text-[#00779e] hover:underline"
                    >
                      <Mail size={13} className="text-slate-400" />
                      {selectedCandidate.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Experience Level</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCandidate.experienceLevel || "Fresher (0–1y)"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Target Role</span>
                    <span className="font-semibold text-slate-800">
                      {selectedCandidate.position || "General"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links & Resume Row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* LinkedIn Button */}
                {selectedCandidate.linkedin ? (
                  <a
                    href={
                      selectedCandidate.linkedin.startsWith("http")
                        ? selectedCandidate.linkedin
                        : `https://${selectedCandidate.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors shadow-xs"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn Profile</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 cursor-not-allowed">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>No LinkedIn</span>
                  </span>
                )}

                {/* Portfolio Button */}
                {selectedCandidate.portfolio ? (
                  <a
                    href={
                      selectedCandidate.portfolio.startsWith("http")
                        ? selectedCandidate.portfolio
                        : `https://${selectedCandidate.portfolio}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-xs"
                  >
                    <Globe size={15} />
                    <span>Portfolio Website</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 cursor-not-allowed">
                    <Globe size={15} />
                    <span>No Portfolio</span>
                  </span>
                )}

                {/* Resume Download / Preview PDF Button */}
                {selectedCandidate.resumeUrl ? (
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] transition-all shadow-sm ml-auto cursor-pointer"
                  >
                    <FileText size={15} />
                    <span>Download / Preview PDF</span>
                    <Download size={13} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed ml-auto">
                    <FileText size={15} />
                    <span>No Resume Uploaded</span>
                  </span>
                )}
              </div>

              {/* Cover Letter */}
              <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText size={14} className="text-[#00779e]" />
                    Cover Letter / Statement
                  </h4>
                  {selectedCandidate.coverLetter && selectedCandidate.coverLetter.length > 200 && (
                    <button
                      type="button"
                      onClick={() => setIsCoverLetterExpanded(!isCoverLetterExpanded)}
                      className="text-xs font-semibold text-[#00779e] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {isCoverLetterExpanded ? "Collapse" : "Expand Full Text"}
                      {isCoverLetterExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  )}
                </div>

                {selectedCandidate.coverLetter ? (
                  <div
                    className={`text-xs text-slate-600 leading-relaxed whitespace-pre-wrap ${
                      !isCoverLetterExpanded && selectedCandidate.coverLetter.length > 200
                        ? "line-clamp-3"
                        : ""
                    }`}
                  >
                    {selectedCandidate.coverLetter}
                  </div>
                ) : (
                  <p className="text-xs italic text-slate-400">
                    No cover letter provided by candidate.
                  </p>
                )}
              </div>

              {/* Hiring Workflow Controls */}
              <div className="bg-[#f0f9ff]/70 p-4 sm:p-5 rounded-2xl border border-sky-100 space-y-4">
                <h4 className="text-xs font-bold text-[#004f6e] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#00779e]" />
                  Hiring Workflow Controls &amp; HR Feedback
                </h4>

                {/* Status Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <label className="text-xs font-semibold text-slate-700">
                    Candidate Status:
                  </label>
                  <div className="sm:col-span-2">
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00779e] shadow-xs cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Notes Box for HR Feedback */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    HR Feedback &amp; Interview Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Enter internal HR feedback, evaluation notes, interview questions or screening results..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e] placeholder:text-slate-400 shadow-xs"
                  />
                </div>

                {/* Save Feedback Button */}
                <div className="flex items-center justify-between pt-1">
                  {saveSuccessMsg ? (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 size={14} />
                      {saveSuccessMsg}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Changes persist immediately to MongoDB cluster.
                    </span>
                  )}

                  <button
                    onClick={handleUpdateStatusAndNotes}
                    disabled={savingNotes}
                    className="px-4 py-2 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
                  >
                    {savingNotes && <Loader2 size={14} className="animate-spin" />}
                    Save Status &amp; Notes
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
