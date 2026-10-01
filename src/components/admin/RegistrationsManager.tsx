"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  Users,
  Briefcase,
  Building2,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  Download,
  ExternalLink,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  Archive,
  X,
  FileText,
  UserCheck,
  TrendingUp,
  Tag
} from "lucide-react";

export interface LeadRegistrationItem {
  _id: string;
  userType: "client" | "candidate";
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  industry?: string;
  experienceLevel?: string;
  requirement?: string;
  resumeUrl?: string;
  resumeName?: string;
  status: "new" | "contacted" | "in-discussion" | "converted" | "archived";
  notes?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: "New",
    bg: "bg-sky-50",
    text: "text-[#00779e]",
    border: "border-sky-200",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  "in-discussion": {
    label: "In Discussion",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  converted: {
    label: "Converted",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  archived: {
    label: "Archived",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-300",
  },
};

export default function RegistrationsManager() {
  const { confirm: confirmAction, dialogProps } = useConfirmDialog();
  const [registrations, setRegistrations] = useState<LeadRegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "client" | "candidate">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<LeadRegistrationItem | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);
  const [leadNotes, setLeadNotes] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    client: 0,
    candidate: 0,
    new: 0,
  });

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/registrations?userType=${typeFilter}&status=${statusFilter}`;
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRegistrations(json.data);
        if (json.counts) {
          setStats(json.counts);
        }
      }
    } catch (err) {
      console.error("Failed to load registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [typeFilter, statusFilter]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRegistrations();
    }, 350);
    return () => clearTimeout(handler);
  }, [search]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/registrations/${selectedLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: leadNotes }),
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations((prev) =>
          prev.map((item) =>
            item._id === selectedLead._id ? { ...item, notes: leadNotes } : item
          )
        );
        setSelectedLead((prev) => (prev ? { ...prev, notes: leadNotes } : null));
      }
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = (id: string) => {
    confirmAction({
      title: "Delete Lead Registration",
      message: "Are you sure you want to permanently delete this lead? This action cannot be undone.",
      confirmText: "Yes, Delete",
      isDestructive: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/registrations/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            setRegistrations((prev) => prev.filter((item) => item._id !== id));
            if (selectedLead?._id === id) {
              setSelectedLead(null);
            }
          }
        } catch (err) {
          console.error("Failed to delete registration:", err);
        }
      },
    });
  };

  const openViewModal = (lead: LeadRegistrationItem) => {
    setSelectedLead(lead);
    setLeadNotes(lead.notes || "");
  };

  const exportCsv = () => {
    if (registrations.length === 0) return;
    const headers = [
      "User Type",
      "Full Name",
      "Email",
      "Phone",
      "Company Name",
      "Industry",
      "Requirement / Message",
      "Resume URL",
      "Status",
      "Registered Date",
    ];

    const rows = registrations.map((r) => [
      `"${r.userType}"`,
      `"${(r.fullName || "").replace(/"/g, '""')}"`,
      `"${(r.email || "").replace(/"/g, '""')}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.companyName || "").replace(/"/g, '""')}"`,
      `"${(r.industry || "").replace(/"/g, '""')}"`,
      `"${(r.requirement || "").replace(/"/g, '""')}"`,
      `"${(r.resumeUrl || "").replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `visha-lead-registrations-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#e6f4f8] text-[#004f6e] border border-sky-200">
              Entry Dialog Leads
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lead Registrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Inquiries captured from visitors upon entering the Visha IT Solutions website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchRegistrations}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs cursor-pointer transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          <button
            onClick={exportCsv}
            disabled={registrations.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#004f6e] to-[#00779e] hover:from-[#003e57] hover:to-[#006282] rounded-xl shadow-xs cursor-pointer transition-all disabled:opacity-50"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Leads
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {stats.total}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp size={12} className="text-emerald-500" />
              Website Dialog
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
            <Users size={22} />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Clients / Employers
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#004f6e] mt-1">
              {stats.client}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              IT & Staffing Clients
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00779e]">
            <Building2 size={22} />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Candidates / Job Seekers
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
              {stats.candidate}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Talent & Training
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Briefcase size={22} />
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              New / Uncontacted
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {stats.new}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Requires attention
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Sparkles size={22} />
          </div>
        </div>
      </div>

      {/* Filter and Tab Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                typeFilter === "all"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Leads ({stats.total})
            </button>
            <button
              onClick={() => setTypeFilter("client")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                typeFilter === "client"
                  ? "bg-white text-[#004f6e] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Clients / Employers ({stats.client})
            </button>
            <button
              onClick={() => setTypeFilter("candidate")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                typeFilter === "candidate"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Candidates ({stats.candidate})
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative min-w-[220px]">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#00779e] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in-discussion">In Discussion</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Lead Type</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Company & Industry</th>
                <th className="py-3 px-4">Resume / CV</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-[#00779e]" />
                    <p className="font-semibold text-xs">Loading lead registrations...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users size={28} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-sm text-slate-600">No registrations found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      New entries submitted through the website entrance dialog will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                registrations.map((item) => {
                  const statusConf = STATUS_CONFIG[item.status] || STATUS_CONFIG.new;
                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Lead Type */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.userType === "client" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#e6f4f8] text-[#004f6e] border border-sky-200">
                            <Building2 size={12} />
                            Client / Employer
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Briefcase size={12} />
                            Candidate / Job Seeker
                          </span>
                        )}
                      </td>

                      {/* Contact Details */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {item.fullName}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1 text-[11px] text-slate-500">
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center gap-1 hover:text-[#00779e] transition-colors"
                          >
                            <Mail size={11} className="text-slate-400" />
                            <span>{item.email}</span>
                          </a>
                          <a
                            href={`tel:${item.phone}`}
                            className="flex items-center gap-1 hover:text-[#00779e] transition-colors font-medium"
                          >
                            <Phone size={11} className="text-slate-400" />
                            <span>{item.phone}</span>
                          </a>
                        </div>
                      </td>

                      {/* Company & Industry */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">
                          {item.companyName || "—"}
                        </div>
                        {item.industry && (
                          <span className="inline-block mt-0.5 text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {item.industry}
                          </span>
                        )}
                      </td>

                      {/* Resume / CV */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.resumeUrl ? (
                          <a
                            href={item.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            <FileText size={12} className="text-[#00779e]" />
                            <span>View CV</span>
                            <ExternalLink size={10} className="text-slate-400" />
                          </a>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No CV</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-discussion">In Discussion</option>
                          <option value="converted">Converted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Registered Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} className="text-slate-400" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 pl-3.5">
                          {new Date(item.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Link */}
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${item.fullName}, thank you for registering with Visha IT Solutions!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-100 transition-colors"
                          >
                            <MessageCircle size={14} />
                          </a>

                          {/* View details */}
                          <button
                            onClick={() => openViewModal(item)}
                            title="View Full Details"
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                          >
                            <Eye size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(item._id)}
                            title="Delete Lead"
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
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

      {/* Detailed View Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    selectedLead.userType === "client"
                      ? "bg-sky-100 text-[#004f6e]"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {selectedLead.userType === "client" ? (
                    <Building2 size={20} />
                  ) : (
                    <Briefcase size={20} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedLead.fullName}
                  </h3>
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      selectedLead.userType === "client"
                        ? "bg-[#00779e]/10 text-[#004f6e]"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {selectedLead.userType === "client"
                      ? "Client / Employer Inquiry"
                      : "Candidate / Job Seeker"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-grow">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </p>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-xs sm:text-sm font-semibold text-[#00779e] hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail size={13} />
                    <span>{selectedLead.email}</span>
                  </a>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Phone Number
                  </p>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#00779e] flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone size={13} />
                    <span>{selectedLead.phone}</span>
                  </a>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Company / Organization
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5">
                    {selectedLead.companyName || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Selected Industry
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5">
                    {selectedLead.industry || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Requirement or Career Note */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Requirement Details / Career Message
                </h4>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed min-h-[70px]">
                  {selectedLead.requirement || (
                    <span className="text-slate-400 italic">No additional message provided.</span>
                  )}
                </div>
              </div>

              {/* CV File */}
              {selectedLead.resumeUrl && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Resume / CV
                  </h4>
                  <div className="flex items-center justify-between p-3.5 bg-sky-50/50 border border-sky-100 rounded-2xl">
                    <div className="flex items-center gap-2.5">
                      <FileText size={18} className="text-[#00779e]" />
                      <span className="text-xs font-semibold text-slate-800 truncate max-w-xs">
                        {selectedLead.resumeName || "Candidate_Resume.pdf"}
                      </span>
                    </div>
                    <a
                      href={selectedLead.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-[#00779e] hover:bg-[#005f7e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>Download / View CV</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Internal Admin Notes
                  </h4>
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="text-xs font-bold text-[#00779e] hover:underline cursor-pointer disabled:opacity-50"
                  >
                    {savingNotes ? "Saving..." : "Save Notes"}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Add private team notes, follow-up dates, or client comments here..."
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-800 cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-discussion">In Discussion</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedLead.fullName}, thank you for registering with Visha IT Solutions!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog {...dialogProps} />
    </div>
  );
}
