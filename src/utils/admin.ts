"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // import toaster

export const useLogoutAdmin = () => {
  const router = useRouter();

  const logoutAdmin = () => {
    // ลบ token และ role
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }

    // แสดง toast
    toast.success("Logout สำเร็จ");

    // redirect ไปหน้า login
    router.push("/admin/login");
  };

  return logoutAdmin;
};
