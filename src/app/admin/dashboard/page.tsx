import { enquiryRepository } from "@/repositories/enquiryRepository";
import { jobRepository } from "@/repositories/jobRepository";
import { projectRepository } from "@/repositories/projectRepository";
import { Users, Briefcase, MessageSquare, FolderGit2 } from "lucide-react";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/lib/models/JobApplication";

export default async function DashboardPage() {
  await connectToDatabase();
  
  // In a real application, you'd fetch real stats. For now we fetch counts.
  const enquiries = await enquiryRepository.getEnquiriesByType("project");
  const contactEnquiries = await enquiryRepository.getEnquiriesByType("contact");
  const activeJobs = await jobRepository.getAllActiveJobs();
  const activeProjects = await projectRepository.getAllActiveProjects();
  const jobApplications = await JobApplication.countDocuments();

  const stats = [
    { label: "Total Enquiries", value: enquiries.length + contactEnquiries.length, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Active Jobs", value: activeJobs.length, icon: Briefcase, color: "text-green-500", bg: "bg-green-100" },
    { label: "Job Applications", value: jobApplications, icon: Users, color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Active Projects", value: activeProjects.length, icon: FolderGit2, color: "text-orange-500", bg: "bg-orange-100" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-light">{stat.label}</p>
              <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-secondary mb-4">Recent Project Enquiries</h2>
          {enquiries.length > 0 ? (
            <div className="space-y-4">
              {enquiries.slice(0, 5).map((enquiry: any) => (
                <div key={enquiry._id} className="p-4 bg-surface rounded-xl border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-secondary">{enquiry.fullName}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{enquiry.serviceRequired}</span>
                  </div>
                  <p className="text-sm text-secondary-light mb-1">{enquiry.email}</p>
                  <p className="text-sm text-secondary-light truncate">{enquiry.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-light text-sm">No recent project enquiries.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-secondary mb-4">Recent Contact Messages</h2>
          {contactEnquiries.length > 0 ? (
            <div className="space-y-4">
              {contactEnquiries.slice(0, 5).map((enquiry: any) => (
                <div key={enquiry._id} className="p-4 bg-surface rounded-xl border border-gray-100">
                  <h4 className="font-semibold text-secondary mb-1">{enquiry.fullName}</h4>
                  <p className="text-xs font-medium text-primary mb-2">{enquiry.subject}</p>
                  <p className="text-sm text-secondary-light truncate">{enquiry.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-secondary-light text-sm">No recent contact messages.</p>
          )}
        </div>
      </div>
    </div>
  );
}
