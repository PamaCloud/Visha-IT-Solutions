import AdminLayoutShell from "@/components/admin/AdminLayoutShell";
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
      <AdminLayoutShell>
        {children}
      </AdminLayoutShell>
    </AuthProvider>
  );
}

