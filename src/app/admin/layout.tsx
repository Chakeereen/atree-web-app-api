
import Sidebar from "@/components/common/admin/SideBar/SideBar";
import { SidebarProvider } from "@/context/SidebarContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto bg-background">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}