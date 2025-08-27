'use client'
import { AppSidebar } from "@/components/common/admin/SideBar/SideBar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
    

        <SidebarProvider className="container grid-cols-[auto_1fr]">
            
                {/* Sidebar */}
                <AppSidebar />

                {/* Main content */}
                <main className="container p-4 overflow-auto">
                    <SidebarTrigger className="mb-4" />
                    {children}
                </main>
            
        </SidebarProvider>
        
    )
}