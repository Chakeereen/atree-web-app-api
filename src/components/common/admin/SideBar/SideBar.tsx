"use client";

import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/lib/utils";
import { Home, Settings, Users, Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const { open, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col",
        open ? "sidebar-open" : "sidebar-closed"
      )}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between">
        {open && <span className="font-bold text-lg px-4 py-3">Admin</span>}
        <button
          onClick={toggle}
          className="p-3 hover:bg-sidebar-accent"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul className="m-0 p-0">
          <li>
            <Link
              href="/admin"
              className="flex items-center gap-3 p-3 hover:bg-sidebar-accent rounded-none"
            >
              <Home size={20} />
              {open && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-3 hover:bg-sidebar-accent rounded-none"
            >
              <Users size={20} />
              {open && <span>Users</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-3 hover:bg-sidebar-accent rounded-none"
            >
              <Settings size={20} />
              {open && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer (ถ้ามี) */}
      <div className="p-0 m-0">
        {/* ใส่ footer content ที่นี่ */}
      </div>
    </aside>
  );
}
