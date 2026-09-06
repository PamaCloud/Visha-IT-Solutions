"use client";

import { useState, useEffect } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Building2,
  Calendar,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Archive,
  X,
  ExternalLink,
  MessageCircle,
  FileText
} from "lucide-react";

interface EnquiryItem {
  _id: string;
  type: "project" | "contact" | "training";
  fullName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  serviceRequired?: string;
  description?: string;
  budgetRange?: string;
  status: "new" | "in-progress" | "resolved" | "archived";
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "project" | "contact" | "training">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = typeFilter === "all" ? "/api/admin/enquiries" : `/api/admin/enquiries?type=${typeFilter}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setEnquiries(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [typeFilter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete the enquiry from "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = enquiries.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (item.phone && item.phone.includes(search)) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.serviceRequired && item.serviceRequired.toLowerCase().includes(search.toLowerCase())) ||
      (item.companyName && item.companyName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare size={24} className="text-[#00779e]" />
            Advisory Quotes &amp; Enquiries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time client leads, project quote requests, phone numbers, and WhatsApp hand-offs.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-[#00779e]" : ""} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, phone number, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00779e]"
          />
        </div>

        {/* Type & Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs">
            {(["all", "project", "contact"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer capitalize ${
                  typeFilter === t
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {t === "all" ? "All Leads" : t === "project" ? "Project Quotes" : "General Contact"}
              </button>
            ))}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:border-[#00779e]"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Enquiries Grid Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Lead / Client</th>
                <th className="py-3.5 px-5">Phone Number</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Profile / Inquiry</th>
                <th className="py-3.5 px-5 hidden sm:table-cell">Date Received</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <RefreshCw size={22} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading enquiries...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No matching enquiries or quote requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const cleanPhone = item.phone?.replace(/[^0-9]/g, "") || "";
                  const hasPhone = Boolean(item.phone && item.phone.trim() !== "");

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-5">
                        <div className="font-semibold text-slate-900 text-sm">
                          {item.fullName}
                        </div>
                        {item.email ? (
                          <a
                            href={`mailto:${item.email}`}
                            className="text-[11px] text-slate-500 hover:text-[#00779e] transition-colors flex items-center gap-1 mt-0.5"
                          >
                            <Mail size={11} className="shrink-0 text-slate-400" />
                            <span>{item.email}</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No email provided</span>
                        )}
                      </td>

                      {/* Phone Number - Prominently Displayed */}
                      <td className="py-3.5 px-5">
                        {hasPhone ? (
                          <div className="space-y-1">
                            <div className="font-mono font-bold text-slate-900 text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                              <Phone size={13} className="text-emerald-600 shrink-0" />
                              <span>{item.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${item.phone}`}
                                className="text-[10px] font-bold text-[#00779e] hover:underline"
                              >
                                Call Client
                              </a>
                              <span className="text-slate-300">&bull;</span>
                              <a
                                href={`https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                              >
                                <MessageCircle size={10} />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Not available</span>
                        )}
                      </td>

                      {/* Profile & Inquiry */}
                      <td className="py-3.5 px-5 hidden lg:table-cell">
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                            {item.companyName || "Client"}
                          </span>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {item.serviceRequired || "General Consultation"}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-5 hidden sm:table-cell text-slate-500 whitespace-nowrap text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-5 text-center">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            item.status === "new"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : item.status === "in-progress"
                              ? "bg-sky-50 text-[#00779e] border-sky-200"
                              : item.status === "resolved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                        >
                          <option value="new">New Lead</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedEnquiry(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Full Lead Details"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.fullName)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Enquiry"
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

      {/* Full Enquiry Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e6f4f8] text-[#00779e] flex items-center justify-center font-bold">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Lead Details</h3>
                  <p className="text-[11px] text-slate-500">
                    Received on {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Client Name
                  </label>
                  <div className="text-sm font-bold text-slate-900">{selectedEnquiry.fullName}</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Phone Number
                  </label>
                  <div className="text-sm font-bold font-mono text-slate-900">
                    {selectedEnquiry.phone || "N/A"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Profile / Org Type
                  </label>
                  <div className="text-slate-800 font-medium">{selectedEnquiry.companyName || "N/A"}</div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Inquiry Type / Service
                  </label>
                  <div className="text-slate-800 font-medium">{selectedEnquiry.serviceRequired || "N/A"}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="text-slate-800 font-medium">
                  {selectedEnquiry.email ? (
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-[#00779e] hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  ) : (
                    "No email provided"
                  )}
                </div>
              </div>

              {selectedEnquiry.description && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Additional Details / Notes
                  </label>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 whitespace-pre-wrap leading-relaxed border border-slate-100">
                    {selectedEnquiry.description}
                  </div>
                </div>
              )}

              {/* Direct Call & WhatsApp Action Row */}
              {selectedEnquiry.phone && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone size={14} />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-center flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle size={14} />
                    <span>Message WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
