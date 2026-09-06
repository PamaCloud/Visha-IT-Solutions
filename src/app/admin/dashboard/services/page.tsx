"use client";

import { useState, useEffect } from "react";
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
  X,
  Search,
  Layers,
  Sparkles,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  badge?: string;
  shortDescription: string;
  description: string;
  iconName?: string;
  subServices?: string[];
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  const defaultFormData = {
    title: "",
    slug: "",
    badge: "Enterprise Grade",
    shortDescription: "",
    description: "",
    iconName: "Users",
    image: "/services/recruitment-and-staffing.jpg",
    subServices: [
      "Executive Search & Leadership Hiring",
      "Permanent & Contract Staffing",
      "Technical Competency Screening",
    ],
    features: [
      "72-Hour Candidate Shortlist SLA",
      "100% Pre-Vetted Engineers & Specialists",
      "Guaranteed Replacement Policy",
    ],
    ctaText: "Explore Service →",
    ctaLink: "/contact",
    isActive: true,
    order: 0,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setServices(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      ...defaultFormData,
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      badge: service.badge || "Enterprise Grade",
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      iconName: service.iconName || "Users",
      image: service.image || "/services/recruitment-and-staffing.jpg",
      subServices: Array.isArray(service.subServices) && service.subServices.length > 0
        ? service.subServices
        : ["Executive Search", "Technical Staffing"],
      features: Array.isArray(service.features) && service.features.length > 0
        ? service.features
        : ["High Reliability", "Industry Standard"],
      ctaText: service.ctaText || "Explore Service →",
      ctaLink: service.ctaLink || `/contact?service=${service.slug}`,
      isActive: service.isActive,
      order: service.order || 0,
    });
    setModalOpen(true);
  };

  // SubServices Helpers
  const addSubService = () => {
    setFormData((prev) => ({
      ...prev,
      subServices: [...prev.subServices, ""],
    }));
  };

  const updateSubService = (index: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.subServices];
      updated[index] = text;
      return { ...prev, subServices: updated };
    });
  };

  const removeSubService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index),
    }));
  };

  // Features Helpers
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const updateFeature = (index: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = text;
      return { ...prev, features: updated };
    });
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      subServices: formData.subServices.filter((s) => s.trim().length > 0),
      features: formData.features.filter((f) => f.trim().length > 0),
    };

    try {
      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) =>
            prev.map((s) => (s._id === editingService._id ? json.data : s))
          );
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) => [json.data, ...prev]);
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
    if (!confirm(`Are you sure you want to delete service "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription?.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Wrench size={22} className="text-[#00779e]" /> Services Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, modify, update, and manage all core IT solutions, sub-offerings, and features.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchServices}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            title="Refresh Services"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#00779e]" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter services by title, slug, summary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Title &amp; Badge</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Slug</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Sub-Services &amp; Features</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading services...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No services found. Click &quot;Add New Service&quot; to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((service) => (
                  <tr key={service._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-gray-900">{service.title}</div>
                      {service.badge && (
                        <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-sky-50 text-[#00779e] text-[10px] font-semibold border border-sky-100">
                          {service.badge}
                        </span>
                      )}
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                        {service.shortDescription}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 hidden md:table-cell font-mono text-[11px]">
                      {service.slug}
                    </td>
                    <td className="py-3.5 px-5 hidden lg:table-cell text-gray-600">
                      <div className="text-[11px] font-medium text-slate-700">
                        {service.subServices?.length || 0} Offerings &bull; {service.features?.length || 0} Features
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {service.features?.slice(0, 2).map((f, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px]"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          service.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id, service.title)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Service"
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

      {/* Dynamic Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <Wrench size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingService ? "Edit Service Offering" : "Add New Service Offering"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Configure service metadata, sub-offerings, feature capabilities, and action links.
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
              {/* Row 1: Title, Slug, Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Service Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Recruitment & Staffing"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL Slug (Auto / Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="recruitment-and-staffing"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g., Enterprise Grade"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 2: Image & Short Description */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cover Image Path
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/services/recruitment-and-staffing.jpg"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-7">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Short Preview Description
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Strategic technical and non-technical talent acquisition across India..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 3: Full Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Service Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed breakdown of how Visha IT Solutions executes and delivers this service..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                />
              </div>

              {/* Dynamic Sub-Services / Scope Offerings */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Layers size={16} className="text-[#00779e]" />
                      Sub-Services &amp; Offerings ({formData.subServices.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Core specialized branches or sub-offerings included in this service.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addSubService}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#00779e] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-sky-100"
                  >
                    <Plus size={14} />
                    <span>Add Sub-Service</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.subServices.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00779e] shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateSubService(idx, e.target.value)}
                        placeholder="e.g., Executive Search & Leadership Hiring"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubService(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Key Features Section */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Sparkles size={16} className="text-amber-500" />
                      Key Features &amp; Service Guarantees ({formData.features.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Highlight SLAs, compliance, turnaround times, and unique value propositions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-amber-100"
                  >
                    <Plus size={14} />
                    <span>Add Feature</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateFeature(idx, e.target.value)}
                        placeholder="e.g., 72-Hour Candidate Shortlist SLA"
                        className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row: CTA Text & CTA Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Call to Action Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Explore Service →"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Call to Action Target Link
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/contact"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Status & Actions Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
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
                    Active &amp; Published on Website
                  </span>
                </label>

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
                    {editingService ? "Update Service Details" : "Save New Service"}
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
