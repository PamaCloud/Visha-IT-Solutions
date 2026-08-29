"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  MessageSquare,
  LogOut,
  Settings2
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Services", href: "/admin/dashboard/services", icon: Settings },
    { name: "Training", href: "/admin/dashboard/training", icon: GraduationCap },
    { name: "Projects", href: "/admin/dashboard/projects", icon: FolderGit2 },
    { name: "Jobs", href: "/admin/dashboard/jobs", icon: Briefcase },
    { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: MessageSquare },
    { name: "Settings", href: "/admin/dashboard/settings", icon: Settings2 },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white">Visha Admin</h2>
      </div>
      
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <link.icon size={20} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white w-full transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
