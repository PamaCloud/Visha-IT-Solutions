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
  Search
} from "lucide-react";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features?: string[];
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
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    features: "",
    isActive: true,
    order: 0,
  });

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
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      features: "",
      isActive: true,
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      features: Array.isArray(service.features) ? service.features.join(", ") : "",
      isActive: service.isActive,
      order: service.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingService) {
        // Update
        const res = await fetch(`/api/admin/services/${editingService._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) =>
            prev.map((s) => (s._id === editingService._id ? json.data : s))
          );
          setModalOpen(false);
        }
      } else {
        // Add
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setServices((prev) => [...prev, json.data]);
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
      s.shortDescription?.toLowerCase().includes(search.toLowerCase())
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
            Create, modify, update, and manage all core IT solutions and design offerings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchServices}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            title="Refresh Services"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#b83822]" : ""} />
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
          placeholder="Filter services by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Title</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Slug</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Features</th>
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
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">
                        {service.shortDescription}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-500 hidden md:table-cell font-mono text-[11px]">
                      {service.slug}
                    </td>
                    <td className="py-3.5 px-5 hidden lg:table-cell text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {service.features?.slice(0, 2).map((f, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px]"
                          >
                            {f}
                          </span>
                        ))}
                        {(service.features?.length || 0) > 2 && (
                          <span className="text-[10px] text-gray-400">
                            +{(service.features?.length || 0) - 2} more
                          </span>
                        )}
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

      {/* Add / Edit Service Modal - Wide Rectangular Layout */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <Wrench size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingService ? "Edit Service" : "Add New Service"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {editingService
                      ? "Modify service information, key deliverables, and website visibility."
                      : "Configure a new service offering to display across the website."}
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

            {/* Modal Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* Row 1: Title & Slug in 2 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Service Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., E-Commerce Platform Development"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    URL Slug <span className="text-slate-400 font-normal">(Optional / Auto-generated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e-commerce-development"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-mono focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Short Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Short Summary Description <span className="text-slate-400 font-normal">(Displayed on card previews)</span>
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, shortDescription: e.target.value })
                  }
                  placeholder="e.g., Strategic technical and non-technical talent acquisition, flexible contract staffing."
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              {/* Row 3: Full Detailed Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Full Detailed Description <span className="text-slate-400 font-normal">(Detailed breakdown shown on service detail view)</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Detailed breakdown of the service, deliverables, strategic approach, and enterprise value..."
                  className="w-full p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white leading-relaxed transition-all"
                />
              </div>

              {/* Row 4: Key Features */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Key Features &amp; Deliverables <span className="text-slate-400 font-normal">(Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="e.g., Contract Staffing, Permanent & Executive Search, Seamless Onboarding, Documentation"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              {/* Row 5: Active Toggle & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                  />
                  <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                    Active Service
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                      formData.isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    {formData.isActive ? "Visible on Website" : "Hidden"}
                  </span>
                </label>

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
                    {editingService ? "Update Service" : "Create Service"}
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
