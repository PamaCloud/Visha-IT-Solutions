import { jobRepository } from "@/repositories/jobRepository";
import { Briefcase, Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminJobsPage() {
  const jobs = await jobRepository.getAllActiveJobs();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <Briefcase size={24} className="text-primary" /> Job Postings
        </h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Post a Job
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface text-secondary-light border-b border-gray-100">
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold hidden md:table-cell">Department</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job: any) => (
                <tr key={job._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-secondary">{job.title}</td>
                  <td className="p-4 text-secondary-light hidden md:table-cell">{job.department}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {job.isActive ? "Active" : "Inactive"}
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
                  No active jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
