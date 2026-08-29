import { serviceRepository } from "@/repositories/serviceRepository";
import { Settings, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminServicesPage() {
  const services = await serviceRepository.getAllServices();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <Settings size={24} className="text-primary" /> Services Management
        </h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface text-secondary-light border-b border-gray-100">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold hidden md:table-cell">Slug</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map((service: any) => (
                <tr key={service._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-secondary">{service.title}</td>
                  <td className="p-4 text-secondary-light hidden md:table-cell">{service.slug}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      service.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-secondary-light">
                  No services found. Add your first service!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
