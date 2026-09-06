import { Image as ImageIcon, Upload, Sparkles } from "lucide-react";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon size={22} className="text-[#00779e]" /> Digital Asset &amp; Media Gallery
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Oversee images, case study artwork, banner assets, and candidate resume archives.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004f6e] via-[#006e94] to-[#0096c7] hover:from-[#003d55] hover:to-[#007ba3] text-white text-xs font-semibold rounded-xl shadow-md shadow-[#00779e]/20 transition-all cursor-pointer">
          <Upload size={15} />
          <span>Upload New Asset</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 text-[#00779e] flex items-center justify-center mx-auto mb-3 border border-sky-100">
          <Sparkles size={28} />
        </div>
        <h3 className="text-sm font-bold text-slate-900">Cloud Media Assets Synced</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          All images, mockups, and client project screenshots are stored securely and optimized for responsive delivery.
        </p>
      </div>
    </div>
  );
}
