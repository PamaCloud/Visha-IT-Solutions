import { enquiryRepository } from "@/repositories/enquiryRepository";
import { MessageSquare, Trash2, Eye } from "lucide-react";

export default async function AdminEnquiriesPage() {
  const projectEnquiries = await enquiryRepository.getEnquiriesByType("project");
  const contactEnquiries = await enquiryRepository.getEnquiriesByType("contact");

  const allEnquiries = [...projectEnquiries, ...contactEnquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <MessageSquare size={24} className="text-primary" /> Enquiries & Messages
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface text-secondary-light border-b border-gray-100">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold hidden md:table-cell">Type</th>
              <th className="p-4 font-semibold hidden lg:table-cell">Details</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allEnquiries.length > 0 ? (
              allEnquiries.map((enquiry: any) => (
                <tr key={enquiry._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm text-secondary-light">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium text-secondary">
                    <div>{enquiry.fullName}</div>
                    <div className="text-xs text-secondary-light font-normal">{enquiry.email}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      enquiry.type === "project" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {enquiry.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary-light hidden lg:table-cell">
                    {enquiry.type === "project" ? enquiry.serviceRequired : enquiry.subject}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
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
                <td colSpan={5} className="p-8 text-center text-secondary-light">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
