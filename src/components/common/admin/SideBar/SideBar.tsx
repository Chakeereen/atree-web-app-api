"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { Home, Users, Settings } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
  const { open } = useSidebar() // ตรวจสอบ state เปิด/ปิด

  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, href: "/admin" },
    { name: "Users", icon: <Users size={18} />, href: "/admin/users" },
    { name: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
  ]

  return (
    
    <Sidebar
      className={`relative h-full transition-all duration-300 ${
        open ? "w-64" : "w-16"
      } border-r  bg-gray-100 `}
       side='left'
    >
      <SidebarHeader>{open && "Admin Menu"}</SidebarHeader>
      <SidebarContent>
        {menu.map((item) => (
          <SidebarGroup key={item.name}>
            <Link
              href={item.href}
              className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>{open && "Footer"}</SidebarFooter>
    </Sidebar>
  )
}
