import AdminSidebar from "@/components/admin/AdminSidebar";
import AuthProvider from "@/components/providers/AuthProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-800 antialiased selection:bg-[#00779e]/20">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="p-6 lg:p-10 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
