"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  X,
  Search
} from "lucide-react";

interface TrainingItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  eligibility: string;
  mode: string;
  curriculum: string;
  projectDetails: string;
  fee?: string;
  status: "upcoming" | "ongoing" | "completed";
  isActive: boolean;
}

export default function AdminTrainingPage() {
  const [courses, setCourses] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TrainingItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    duration: "12 Weeks",
    eligibility: "Students & Graduates",
    mode: "Hybrid",
    curriculum: "Comprehensive syllabus",
    projectDetails: "3 Industry Capstone Projects",
    fee: "",
    status: "upcoming",
    isActive: true,
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/training");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCourses(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      duration: "12 Weeks",
      eligibility: "Students & Graduates",
      mode: "Hybrid",
      curriculum: "Comprehensive syllabus",
      projectDetails: "3 Industry Capstone Projects",
      fee: "",
      status: "upcoming",
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (course: TrainingItem) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      slug: course.slug,
      description: course.description || "",
      duration: course.duration || "12 Weeks",
      eligibility: course.eligibility || "",
      mode: course.mode || "Hybrid",
      curriculum: course.curriculum || "",
      projectDetails: course.projectDetails || "",
      fee: course.fee || "",
      status: course.status || "upcoming",
      isActive: course.isActive,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourse) {
        const res = await fetch(`/api/admin/training/${editingCourse._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setCourses((prev) =>
            prev.map((c) => (c._id === editingCourse._id ? json.data : c))
          );
          setModalOpen(false);
        }
      } else {
        const res = await fetch("/api/admin/training", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (json.success) {
          setCourses((prev) => [...prev, json.data]);
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
    if (!confirm(`Are you sure you want to delete course "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/training/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setCourses((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <GraduationCap size={24} className="text-[#00779e]" /> Training &amp; Courses Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage professional training courses, curricula, durations, and enrollment fees.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCourses}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            title="Refresh Courses"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-[#00779e]" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#004f6e] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter courses by name or syllabus..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Course Title</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Duration &amp; Mode</th>
                <th className="py-3.5 px-5 hidden lg:table-cell">Fee</th>
                <th className="py-3.5 px-5 text-center">Batch Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading training programs...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No courses found. Click &quot;Add New Course&quot; to publish your first program.
                  </td>
                </tr>
              ) : (
                filtered.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-gray-900">{course.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">
                        {course.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-gray-600 hidden md:table-cell">
                      <div className="font-medium">{course.duration}</div>
                      <div className="text-[11px] text-gray-400">{course.mode}</div>
                    </td>
                    <td className="py-3.5 px-5 hidden lg:table-cell font-semibold text-gray-800">
                      {course.fee || "Free / Inquiry"}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${
                          course.status === "upcoming"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : course.status === "ongoing"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(course)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Course"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id, course.title)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Course"
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
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingCourse ? "Edit Course" : "Add New Course"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    {editingCourse
                      ? "Update training program curriculum, duration, and details."
                      : "Create a new professional training track to publish on /training."}
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
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Course Title <span className="text-[#00779e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Python Full Stack Development Masterclass"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 6 Months / 24 Weeks"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Mode
                  </label>
                  <input
                    type="text"
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    placeholder="e.g., Hybrid (Online + Lab)"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    Course Fee / Investment
                  </label>
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    placeholder="e.g., INR 35,000"
                    className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Course Overview &amp; Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Comprehensive summary of what students will learn, industry applications, and project outcomes..."
                  className="w-full p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white leading-relaxed transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Curriculum Highlights <span className="text-slate-400 font-normal">(Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.curriculum}
                  onChange={(e) =>
                    setFormData({ ...formData, curriculum: e.target.value })
                  }
                  placeholder="e.g., Python Core, Django REST Framework, React 19 Frontend, PostgreSQL, AWS Deployment"
                  className="w-full px-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00779e] focus:bg-white transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as any,
                        })
                      }
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00779e]"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer select-none pt-4">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="w-4 h-4 rounded text-[#00779e] focus:ring-0 border-slate-300"
                    />
                    <span className="font-semibold text-slate-700 text-xs sm:text-sm">
                      Active on Website
                    </span>
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
                    {editingCourse ? "Update Course" : "Create Course"}
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
