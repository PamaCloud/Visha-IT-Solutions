import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
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
      <div className="flex min-h-screen bg-gray-50 font-sans text-secondary">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="p-8 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
