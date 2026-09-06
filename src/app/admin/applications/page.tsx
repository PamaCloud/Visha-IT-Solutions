import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AuthProvider from "@/components/providers/AuthProvider";
import CandidatesManager from "@/components/admin/CandidatesManager";

export const metadata = {
  title: "Candidate Applications - Admin Panel",
};

export default async function DirectApplicationsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-[#f8fafc] font-sans text-gray-800 antialiased">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="p-6 lg:p-8 flex-1 overflow-y-auto">
            <CandidatesManager />
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
