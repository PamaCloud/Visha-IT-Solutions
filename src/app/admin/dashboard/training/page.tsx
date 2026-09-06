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
  Search,
  BookOpen,
  ChevronDown,
  Layers,
  Sparkles,
  ListPlus
} from "lucide-react";

import { VISHA_TRAINING_PROGRAMS } from "@/data/vishaTraining";

interface CourseModule {
  title: string;
  badge: string;
  description: string;
  points: string[];
}

interface TrainingItem {
  _id: string;
  title: string;
  slug: string;
  badge?: string;
  shortDescription?: string;
  description: string;
  duration: string;
  mode: string;
  level?: string;
  technologies?: string[];
  syllabus?: string[];
  modules?: CourseModule[];
  careerRoles?: string[];
  image?: string;
  eligibility?: string;
  curriculum?: string;
  projectDetails?: string;
  fee?: string;
  status: "upcoming" | "ongoing" | "completed";
  isActive: boolean;
  order?: number;
}

export default function AdminTrainingPage() {
  const [courses, setCourses] = useState<TrainingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<TrainingItem | null>(null);
  const [saving, setSaving] = useState(false);

  const defaultFormData = {
    title: "",
    slug: "",
    badge: "Most Popular",
    shortDescription: "",
    description: "",
    duration: "6 Months",
    mode: "Hybrid (Online + Lab)",
    level: "Beginner to Enterprise",
    fee: "",
    image: "/services/training-and-career-development.jpg",
    technologies: "",
    careerRoles: "",
    syllabus: "",
    modules: [] as CourseModule[],
    status: "upcoming" as "upcoming" | "ongoing" | "completed",
    isActive: true,
    order: 0,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/training");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const enriched = json.data.map((c: any) => {
          const fallback = VISHA_TRAINING_PROGRAMS.find((v) => v.slug === c.slug);
          return {
            ...c,
            modules: Array.isArray(c.modules) && c.modules.length > 0 ? c.modules : (fallback?.modules || []),
            technologies: Array.isArray(c.technologies) && c.technologies.length > 0 ? c.technologies : (fallback?.technologies || []),
            careerRoles: Array.isArray(c.careerRoles) && c.careerRoles.length > 0 ? c.careerRoles : (fallback?.careerRoles || []),
            badge: c.badge || fallback?.badge || "Most Popular",
          };
        });
        setCourses(enriched);
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
      ...defaultFormData,
      order: courses.length + 1,
      modules: [
        {
          title: "Module 1: Core Architecture & Foundations",
          badge: "Weeks 1 - 4",
          description: "Introduction to language syntax, object modeling, and developer workflow tools.",
          points: ["Syntax & Core Language Features", "Object-Oriented Design & Patterns", "Git Version Control"],
        },
        {
          title: "Module 2: Server Services, APIs & Databases",
          badge: "Weeks 5 - 8",
          description: "Building production microservices, secure RESTful endpoints, and relational database schemas.",
          points: ["REST API Architecture", "Database Schema & Optimization", "Authentication & Security"],
        },
      ],
    });
    setModalOpen(true);
  };

  const openEditModal = (course: TrainingItem) => {
    setEditingCourse(course);
    const fallback = VISHA_TRAINING_PROGRAMS.find((v) => v.slug === course.slug);
    const resolvedModules = Array.isArray(course.modules) && course.modules.length > 0
      ? course.modules
      : (fallback?.modules || []);

    setFormData({
      title: course.title,
      slug: course.slug,
      badge: course.badge || fallback?.badge || "Most Popular",
      shortDescription: course.shortDescription || fallback?.shortDescription || "",
      description: course.description || fallback?.description || "",
      duration: course.duration || fallback?.duration || "6 Months",
      mode: course.mode || fallback?.mode || "Hybrid",
      level: course.level || fallback?.level || "Beginner to Enterprise",
      fee: course.fee || "INR 35,000",
      image: course.image || fallback?.image || "/services/training-and-career-development.jpg",
      technologies: Array.isArray(course.technologies) && course.technologies.length > 0
        ? course.technologies.join(", ")
        : (fallback?.technologies?.join(", ") || ""),
      careerRoles: Array.isArray(course.careerRoles) && course.careerRoles.length > 0
        ? course.careerRoles.join(", ")
        : (fallback?.careerRoles?.join(", ") || ""),
      syllabus: Array.isArray(course.syllabus) && course.syllabus.length > 0
        ? course.syllabus.join(", ")
        : (fallback?.syllabus?.join(", ") || course.curriculum || ""),
      modules: resolvedModules,
      status: course.status || "upcoming",
      isActive: course.isActive,
      order: course.order || 0,
    });
    setModalOpen(true);
  };

  // Dynamic Module Helpers
  const addModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: `Module ${prev.modules.length + 1}: `,
          badge: "Weeks 1 - 4",
          description: "",
          points: ["Core Topics & Hands-on Labs"],
        },
      ],
    }));
  };

  const removeModule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const updateModuleField = (index: number, field: keyof CourseModule, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.modules];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, modules: updated };
    });
  };

  const addModulePoint = (moduleIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.modules];
      updated[moduleIndex] = {
        ...updated[moduleIndex],
        points: [...updated[moduleIndex].points, ""],
      };
      return { ...prev, modules: updated };
    });
  };

  const updateModulePoint = (moduleIndex: number, pointIndex: number, text: string) => {
    setFormData((prev) => {
      const updated = [...prev.modules];
      const pts = [...updated[moduleIndex].points];
      pts[pointIndex] = text;
      updated[moduleIndex] = { ...updated[moduleIndex], points: pts };
      return { ...prev, modules: updated };
    });
  };

  const removeModulePoint = (moduleIndex: number, pointIndex: number) => {
    setFormData((prev) => {
      const updated = [...prev.modules];
      const pts = updated[moduleIndex].points.filter((_, i) => i !== pointIndex);
      updated[moduleIndex] = { ...updated[moduleIndex], points: pts };
      return { ...prev, modules: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...formData,
      shortDescription: formData.shortDescription || formData.description.slice(0, 160),
      technologies: formData.technologies.split(",").map((s) => s.trim()).filter(Boolean),
      careerRoles: formData.careerRoles.split(",").map((s) => s.trim()).filter(Boolean),
      syllabus: formData.syllabus.split(",").map((s) => s.trim()).filter(Boolean),
      modules: formData.modules.map((m) => ({
        ...m,
        points: m.points.filter((p) => p.trim().length > 0),
      })),
    };

    try {
      if (editingCourse) {
        const res = await fetch(`/api/admin/training/${editingCourse._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success) {
          setCourses((prev) => [json.data, ...prev]);
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
      c.duration?.toLowerCase().includes(search.toLowerCase()) ||
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
            Publish courses, manage deep curriculum breakdown modules, topics, durations, and career roles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchCourses}
            className="p-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
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
          placeholder="Filter courses by title, duration, curriculum..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-[#00779e]"
        />
      </div>

      {/* Courses View: Desktop Table + Mobile Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3.5 px-5">Course Title</th>
                <th className="py-3.5 px-5 hidden sm:table-cell">Duration &amp; Mode</th>
                <th className="py-3.5 px-5 hidden md:table-cell">Modules</th>
                <th className="py-3.5 px-5 text-center">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
                    Loading courses...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No training courses found. Click &quot;Add New Course&quot; to create one.
                  </td>
                </tr>
              ) : (
                filtered.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-gray-900">{course.title}</div>
                      <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                        {course.shortDescription || course.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 hidden sm:table-cell">
                      <div className="font-medium text-gray-800">{course.duration}</div>
                      <div className="text-[11px] text-gray-400">{course.mode}</div>
                    </td>
                    <td className="py-3.5 px-5 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 text-[#00779e] text-[10px] font-semibold border border-sky-100">
                        <BookOpen size={11} />
                        <span>{course.modules?.length || 0} Modules</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          course.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {course.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(course)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Course & Modules"
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

        {/* Dedicated Mobile Cards View (Visible only on mobile < md) */}
        <div className="block md:hidden divide-y divide-gray-100">
          {loading ? (
            <div className="py-12 text-center text-gray-400">
              <Loader2 size={24} className="animate-spin text-[#00779e] mx-auto mb-2" />
              Loading courses...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs px-4">
              No training courses found. Click &quot;Add New Course&quot; to create one.
            </div>
          ) : (
            filtered.map((course) => (
              <div key={course._id} className="p-4 space-y-3 bg-white hover:bg-slate-50/50 transition-colors">
                {/* Header: Title + Status Pill */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">
                      {course.title}
                    </h3>
                    {course.badge && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-sky-50 text-[#00779e] text-[10px] font-bold border border-sky-100">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      course.isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {course.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Quick Info Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-[#00779e] text-[10px] font-bold border border-sky-100">
                    <BookOpen size={11} />
                    <span>{course.modules?.length || 0} Modules</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium">
                    <Clock size={11} />
                    <span>{course.duration}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                    {course.mode}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.shortDescription || course.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400">
                    {course.level || "Professional Masterclass"}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(course)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#004f6e] hover:bg-[#003d55] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <Edit2 size={12} />
                      <span>Edit Curriculum</span>
                    </button>
                    <button
                      onClick={() => handleDelete(course._id, course.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dynamic Add / Edit Course Modal - Extra Wide */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-[96vw] max-w-6xl xl:max-w-7xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e6f4f8] text-[#00779e] flex items-center justify-center border border-sky-100">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    {editingCourse ? "Edit Course & Syllabus Modules" : "Add New Professional Course"}
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Dynamically configure course info, duration, technologies, and detailed curriculum modules.
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
              {/* Row 1: Title, Slug & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Course Title <span className="text-[#00779e]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., MERN Stack Development Masterclass"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Slug (Auto / Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="mern-stack-development"
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
                    placeholder="e.g., Most Popular"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 2: Duration, Mode, Level, Fee */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 6 Months"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mode</label>
                  <input
                    type="text"
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    placeholder="e.g., Hybrid (Online + Lab)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Level</label>
                  <input
                    type="text"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="Beginner to Enterprise"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fee / Investment</label>
                  <input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    placeholder="Optional (e.g. INR 35,000)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Course Overview &amp; Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive summary of what students master in this course..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                />
              </div>

              {/* Row 4: Technologies & Career Roles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Technologies Covered (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    placeholder="MongoDB, Express.js, React 19, Node.js, Next.js, Docker"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Career Roles Qualified For (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.careerRoles}
                    onChange={(e) => setFormData({ ...formData, careerRoles: e.target.value })}
                    placeholder="Full Stack Developer, Frontend Engineer, Node.js Specialist"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                  />
                </div>
              </div>

              {/* Dynamic Curriculum Modules Section */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <BookOpen size={16} className="text-[#00779e]" />
                      Curriculum Modules ({formData.modules.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Add, organize, and outline each syllabus module and its core topic points.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addModule}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-[#00779e] font-semibold rounded-xl text-xs transition-colors cursor-pointer border border-sky-100"
                  >
                    <Plus size={14} />
                    <span>Add Module</span>
                  </button>
                </div>

                {formData.modules.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-slate-400">
                    No curriculum modules added yet. Click &quot;Add Module&quot; above to create syllabus modules.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.modules.map((module, modIdx) => (
                      <div
                        key={modIdx}
                        className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/80 space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                            <div className="sm:col-span-8">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                Module Title
                              </label>
                              <input
                                type="text"
                                required
                                value={module.title}
                                onChange={(e) =>
                                  updateModuleField(modIdx, "title", e.target.value)
                                }
                                placeholder="e.g., Module 1: JavaScript & Web Foundations"
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#00779e]"
                              />
                            </div>
                            <div className="sm:col-span-4">
                              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                                Badge / Weeks
                              </label>
                              <input
                                type="text"
                                value={module.badge}
                                onChange={(e) =>
                                  updateModuleField(modIdx, "badge", e.target.value)
                                }
                                placeholder="e.g., Weeks 1 - 3"
                                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#00779e]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeModule(modIdx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0 mt-5"
                            title="Delete this module"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Module Summary Description
                          </label>
                          <input
                            type="text"
                            value={module.description}
                            onChange={(e) =>
                              updateModuleField(modIdx, "description", e.target.value)
                            }
                            placeholder="e.g., HTML, CSS, modern JavaScript ES6+, and DOM manipulation."
                            className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-[#00779e]"
                          />
                        </div>

                        {/* Topics / Bullet Points for this module */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Topic Points
                            </label>
                            <button
                              type="button"
                              onClick={() => addModulePoint(modIdx)}
                              className="text-[10px] font-bold text-[#00779e] hover:underline flex items-center gap-0.5 cursor-pointer"
                            >
                              <Plus size={11} /> Add Point
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {module.points.map((pt, ptIdx) => (
                              <div key={ptIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00779e] shrink-0" />
                                <input
                                  type="text"
                                  value={pt}
                                  onChange={(e) =>
                                    updateModulePoint(modIdx, ptIdx, e.target.value)
                                  }
                                  placeholder="e.g., HTML5, Modern CSS & Flexbox Grid"
                                  className="flex-1 px-3 py-1 bg-white border border-slate-200 rounded-md text-xs text-slate-700 focus:outline-none focus:border-[#00779e]"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeModulePoint(modIdx, ptIdx)}
                                  className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status & Actions Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Status
                    </label>
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
                    {editingCourse ? "Update Course & Modules" : "Save Course & Modules"}
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
