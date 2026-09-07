"use client";

import { useState, useEffect } from "react";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  X,
  Search,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface JobItem {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experienceRequired: string;
  description: string;
  requirements: string[];
  skills?: string[];
  status: "open" | "closed";
  isActive: boolean;
  createdAt: string;
}

export default function AdminJobsPage() {
  const { confirm: confirmAction, dialogProps } = useConfirmDialog();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobItem | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "Engineering",
    location: "Hyderabad (Hybrid)",
    type: "Full-Time",
    experienceRequired: "2–4 Years",
    description: "",
    requirements: "",
    skills: "",
    status: "open",
    isActive: true,
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/jobs");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setJobs(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      slug: "",
      department: "Engineering",
      location: "Hyderabad (Hybrid)",
      type: "Full-Time",
      experienceRequired: "2–4 Years",
      description: "",
      requirements: "",
      skills: "Next.js, React, Node.js, TypeScript",
      status: "open",
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (job: JobItem) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      slug: job.slug,
      department: job.department,
      location: job.location,
      type: job.type,
      experienceRequired: job.experienceRequired,
      description: job.description || "",
      requirements: Array.isArray(job.requirements)
        ? job.requirements.join("\n")
        : "",
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
      status: job.status || "open",
      isActive: job.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingJob) {
        const res = await fetch(`/api/admin/jobs/${editingJob._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setJobs((prev) =>
            prev.map((j) => (j._id === editingJob._id ? json.data : j))
          );
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setJobs((prev) => [json.data, ...prev]);
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete job posting "${title}"? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      isDestructive: true,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
          const json = await res.json();
          if (json.success) {
            setJobs((prev) => prev.filter((j) => j._id !== id));
          }
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department?.toLowerCase().includes(search.toLowerCase()) ||
      j.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase size={24} className="text-[#00779e]" /> Job Postings &amp; Recruitment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Post new career opportunities, update job requirements, and manage openings that appear live on the Careers page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/careers#open-roles"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ExternalLink size={13} className="text-[#00779e]" />
            <span>View Live Careers Page</span>
          </Link>
          <button
            onClick={fetchJobs}
            className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            title="Refresh Jobs"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#00779e]" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Post a New Job</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter jobs by title, department, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Job Title &amp; Department</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Location &amp; Type</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Experience</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading job postings...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No jobs found. Click &quot;Post a New Job&quot; to publish your first role.
                  </td>
                </tr>
              ) : (
                filtered.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-slate-900">{job.title}</div>
                      <div className="text-[11px] text-[#004f6e] font-medium">
                        {job.department}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{job.type}</div>
                    </td>
                    <td className="py-3.5 px-5 hidden lg:table-cell text-slate-700 font-medium">
                      {job.experienceRequired}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          job.status === "open" && job.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {job.status === "open" && job.isActive ? "Active (Live)" : "Closed / Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Job"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id, job.title)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Job"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add / Edit Job - Wide Rectangular Layout */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingJob ? "Edit Job Posting" : "Post a New Job"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {editingJob
                      ? "Update job details, experience requirement, description, and status."
                      : "Create a new job role to publish live on the Careers page."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Job Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Full Stack Developer"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Department <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    placeholder="e.g., Engineering / Cloud / Marketing"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Hyderabad (Hybrid) / Remote"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    value={formData.experienceRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceRequired: e.target.value,
                      })
                    }
                    placeholder="e.g., 2–5 Years"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="e.g., Full-Time / Contract"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Required Skills <span className="text-slate-400 font-normal">(Comma-separated tags)</span>
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., Next.js, React, Node.js, MongoDB, TypeScript, AWS"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Role Overview &amp; Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Outline core responsibilities, team collaboration, and impact..."
                  className="w-full p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white leading-relaxed transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Key Requirements <span className="text-slate-400 font-normal">(One bullet point per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  placeholder="3+ years experience with Next.js and TypeScript&#10;Strong backend architecture with Node.js and MongoDB&#10;Experience deploying on AWS or Vercel with CI/CD"
                  className="w-full p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white leading-relaxed font-mono transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.status === "open"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.checked ? "open" : "closed",
                        })
                      }
                      className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700 text-xs sm:text-sm">Open for Applications</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700 text-xs sm:text-sm">Active / Published</span>
                  </label>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors cursor-pointer text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white rounded-xl font-semibold flex items-center gap-2 shadow-md shadow-[#00779e]/20 transition-all cursor-pointer text-xs sm:text-sm disabled:opacity-70"
                  >
                    {saving && <Loader2 size={15} className="animate-spin" />}
                    {editingJob ? "Update Job" : "Publish Job to Careers"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ConfirmDialog {...dialogProps} />
    </div>
  );
}