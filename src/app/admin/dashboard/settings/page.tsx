import SiteSetting from "@/lib/models/SiteSetting";
import connectToDatabase from "@/lib/mongoose";
import { Settings2, Save } from "lucide-react";

export default async function AdminSettingsPage() {
  await connectToDatabase();
  const settings = await SiteSetting.findOne().lean();

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <Settings2 size={24} className="text-primary" /> Site Settings
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form className="space-y-6">
          <h3 className="text-lg font-bold text-secondary border-b border-gray-100 pb-2 mb-4">General Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Company Name</label>
              <input type="text" className="input-field" defaultValue={settings?.companyName} />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Contact Email</label>
              <input type="email" className="input-field" defaultValue={settings?.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Contact Phone</label>
              <input type="text" className="input-field" defaultValue={settings?.phone} />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Address</label>
              <input type="text" className="input-field" defaultValue={settings?.address} />
            </div>
          </div>

          <h3 className="text-lg font-bold text-secondary border-b border-gray-100 pb-2 mt-8 mb-4">SEO Defaults</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Default Title Tag</label>
              <input type="text" className="input-field" defaultValue={settings?.seoDefaults?.title} />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Default Meta Description</label>
              <textarea rows={3} className="input-field resize-none" defaultValue={settings?.seoDefaults?.description}></textarea>
            </div>
          </div>

          <div className="pt-6">
            <button type="button" className="btn btn-primary px-8 py-3 flex items-center gap-2">
              <Save size={18} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
