import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Visha IT Solutions",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* We can add a simple admin header here later if needed,
          but for now, the login page should just be centered,
          and the dashboard will have its own layout structure 
          inside the dashboard folder. */}
      {children}
    </div>
  );
}
