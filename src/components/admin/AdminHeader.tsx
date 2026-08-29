"use client";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      <h2 className="text-xl font-semibold text-secondary">Dashboard</h2>
      
      <div className="flex items-center gap-4">
        <div className="text-sm text-right hidden sm:block">
          <p className="font-semibold text-secondary">{session?.user?.name || "Admin"}</p>
          <p className="text-secondary-light text-xs">{session?.user?.email}</p>
        </div>
        <div className="w-10 h-10 bg-primary-light text-primary rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
