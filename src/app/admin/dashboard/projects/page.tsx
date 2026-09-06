"use client";

import { useState, useEffect } from "react";
import {
  FolderGit2,
  Folder,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
  X,
  Search,
  Star
} from "lucide-react";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  image?: string;
  outcome: string;
  projectUrl?: string;
  featured: boolean;
  isActive: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Web Application",
    description: "",
    technologies: "",
    image: "",
    outcome: "",
    projectUrl: "",
    featured: false,
    isActive: true,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "Web Application",
      description: "",
      technologies: "Next.js, Tailwind CSS, MongoDB",
      image: "",
      outcome: "High performance & conversion",
      projectUrl: "",
      featured: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category || "Web Application",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      image: project.image || "",
      outcome: project.outcome || "",
      projectUrl: project.projectUrl || "",
      featured: project.featured,
      isActive: project.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setProjects((prev) =>
            prev.map((p) => (p._id === editingProject._id ? json.data : p))
          );
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setProjects((prev) => [...prev, json.data]);
          setModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FolderGit2 size={24} className="text-[#00779e]" /> Projects &amp; Portfolio Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showcase successful case studies, tech stacks, live demos, and business outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProjects}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            title="Refresh Projects"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#00779e]" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter projects by title, category, tech..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Project Title</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Category</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Technologies</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading projects...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No projects found. Click &quot;Add New Project&quot; to showcase your work.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => (
                  <tr key={proj._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        {proj.featured && (
                          <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />
                        )}
                        <span className="font-semibold text-gray-900">{proj.title}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">
                        {proj.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-medium">
                        {proj.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 hidden lg:table-cell text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies?.slice(0, 3).map((t, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          proj.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {proj.isActive ? "Live" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {proj.projectUrl && (
                          <a
                            href={proj.projectUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Open Link"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id, proj.title)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Project"
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

      {/* Modal - Wide Rectangular Layout */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <Folder size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingProject ? "Edit Project Case Study" : "Add New Project"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {editingProject
                      ? "Update project details, technologies, client outcome, and showcase settings."
                      : "Add an enterprise project case study to showcase on /projects."}
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
                    Project Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Global E-Commerce Platform"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., E-Commerce & Omnichannel"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Technologies <span className="text-slate-400 font-normal">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    placeholder="Next.js 15, Node.js, MongoDB Atlas, Redis, Stripe API"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Live Demo / Client URL
                  </label>
                  <input
                    type="url"
                    value={formData.projectUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, projectUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Case Study Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed breakdown of client challenge, architecture designed, deliverables, and engineering solutions..."
                  className="w-full p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white leading-relaxed transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Measurable Outcome &amp; Impact
                </label>
                <input
                  type="text"
                  value={formData.outcome}
                  onChange={(e) =>
                    setFormData({ ...formData, outcome: e.target.value })
                  }
                  placeholder="e.g., +45% Conversion Surge, <800ms Page Latency, 99.99% Uptime"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700 text-xs sm:text-sm">Featured on Home</span>
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
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
