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
  Star,
  CheckCircle2,
  TrendingUp,
  Layers
} from "lucide-react";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  clientName?: string;
  category: string;
  badge?: string;
  shortDescription?: string;
  description: string;
  technologies: string[];
  metrics?: string[];
  deliverables?: string[];
  image?: string;
  outcome: string;
  projectUrl?: string;
  featured: boolean;
  isActive: boolean;
  order?: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);

  const defaultFormData = {
    title: "",
    slug: "",
    clientName: "Enterprise Client",
    category: "Financial Technology & Banking",
    badge: "Production Deployed",
    shortDescription: "",
    description: "",
    technologies: "Next.js, TypeScript, PostgreSQL, Tailwind CSS",
    deliverables: [
      "Modular Cloud Microservices Architecture",
      "High-Throughput API Gateway & Authentication",
      "Automated Multi-Stage CI/CD Deployment",
    ],
    metrics: [
      "99.99% Cloud Uptime",
      "<50ms Real-Time Data Push",
      "+40% Operational Efficiency",
    ],
    image: "/services/ecommerce-solutions.jpg",
    outcome: "Accelerated operational throughput by 40% while reducing cloud operating costs.",
    projectUrl: "",
    featured: false,
    isActive: true,
  };

  const [formData, setFormData] = useState(defaultFormData);

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
    setFormData(defaultFormData);
    setModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      clientName: project.clientName || "Enterprise Client",
      category: project.category || "Enterprise Software",
      badge: project.badge || "Featured Project",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : "",
      deliverables: Array.isArray(project.deliverables) && project.deliverables.length > 0
        ? project.deliverables
        : ["Modular Microservices Architecture", "Automated CI/CD Pipeline"],
      metrics: Array.isArray(project.metrics) && project.metrics.length > 0
        ? project.metrics
        : [project.outcome || "Production Deployed"],
      image: project.image || "/services/ecommerce-solutions.jpg",
      outcome: project.outcome || "",
      projectUrl: project.projectUrl || "",
      featured: Boolean(project.featured),
      isActive: project.isActive,
    });
    setModalOpen(true);
  };

  // Deliverables helpers
  const addDeliverable = () => {
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, ""],
    }));
  };

  const updateDeliverable = (index: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.deliverables];
      updated[index] = text;
      return { ...prev, deliverables: updated };
    });
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  // Metrics helpers
  const addMetric = () => {
    setFormData((prev) => ({
      ...prev,
      metrics: [...prev.metrics, ""],
    }));
  };

  const updateMetric = (index: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.metrics];
      updated[index] = text;
      return { ...prev, metrics: updated };
    });
  };

  const removeMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      shortDescription: formData.shortDescription || formData.description.slice(0, 160),
      technologies: formData.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      deliverables: formData.deliverables.filter((d) => d.trim().length > 0),
      metrics: formData.metrics.filter((m) => m.trim().length > 0),
    };

    try {
      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setProjects((prev) => [json.data, ...prev]);
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
      p.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <FolderGit2 size={24} className="text-[#00779e]" /> Projects &amp; Case Studies Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showcase enterprise case studies, deliverables, tech stacks, live metrics, and client outcomes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProjects}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
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
          placeholder="Filter projects by title, client, category, tech..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Project &amp; Client</th>
                <th className="py-3.5 px-5 hidden sm:table-cell">Category &amp; Badge</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Deliverables &amp; Impact</th>
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
                    No projects found. Click &quot;Add New Project&quot; to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-gray-900">{project.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                        {project.clientName || "Enterprise Client"} &bull; {project.slug}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 hidden sm:table-cell">
                      <div className="font-medium text-gray-800">{project.category}</div>
                      {project.badge && (
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-sky-50 text-[#00779e] text-[10px] font-semibold border border-sky-100">
                          {project.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 hidden md:table-cell">
                      <div className="text-[11px] text-slate-700 font-medium">
                        {project.deliverables?.length || 0} Deliverables &bull; {project.metrics?.length || 0} Metrics
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-xs">
                        {project.outcome}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          project.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {project.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Project Details"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id, project.title)}
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

      {/* Dynamic Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <FolderGit2 size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingProject ? "Edit Project Case Study" : "Add New Case Study & Project"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Configure project info, tech stack, dynamic deliverables, and measurable metrics.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Row 1: Title, Slug, Client */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Global E-Commerce Platform"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Client Name / Partner
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g., RetailCorp Global"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL Slug (Auto / Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="ecommerce-platform"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 2: Category, Badge, Image */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Financial Technology & Banking"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g., High Concurrency / Zero-Latency"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/services/ecommerce-solutions.jpg"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Project Case Study Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Architectural overview, client challenges, technical roadmap, and solution implementation..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                />
              </div>

              {/* Row 4: Technologies & Outcome */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="Next.js, TypeScript, PostgreSQL, Tailwind CSS, Docker"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Key Business Outcome Summary
                  </label>
                  <input
                    type="text"
                    value={formData.outcome}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="e.g., Accelerated throughput by 40% while reducing cloud operating costs by 32%."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Dynamic Deliverables Section */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Layers size={16} className="text-[#00779e]" />
                      Key Deliverables &amp; Engineering Scope ({formData.deliverables.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Outline specific technical achievements delivered for this client.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addDeliverable}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#00779e] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-sky-100"
                  >
                    <Plus size={14} />
                    <span>Add Deliverable</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00779e] shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateDeliverable(idx, e.target.value)}
                        placeholder="e.g., Sub-Millisecond Financial Stream Visualization"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                      />
                      <button
                        type="button"
                        onClick={() => removeDeliverable(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Key Metrics Section */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <TrendingUp size={16} className="text-emerald-600" />
                      Measurable Performance Metrics ({formData.metrics.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Concrete statistics proving project success and enterprise impact.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addMetric}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-emerald-100"
                  >
                    <Plus size={14} />
                    <span>Add Metric</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.metrics.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateMetric(idx, e.target.value)}
                        placeholder="e.g., 99.99% Cloud Uptime or +45% Faster Conversion"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeMetric(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Actions Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700 text-xs flex items-center gap-1">
                      <Star size={13} className="text-amber-500" /> Featured on Homepage
                    </span>
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
                    <span className="font-semibold text-slate-700 text-xs">
                      Active on Website
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors cursor-pointer text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white rounded-xl font-semibold flex items-center gap-2 shadow-md shadow-[#00779e]/20 transition-all cursor-pointer text-xs disabled:opacity-70"
                  >
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    {editingProject ? "Update Project Case Study" : "Save Project Case Study"}
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
