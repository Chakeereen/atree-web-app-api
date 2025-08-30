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
      toast.success("Logout สำเร็จ");
    }
    else{
      toast.warning("คุณไม่ได้อยู่ในระบบ");
    }

    // แสดง toast
   

    // redirect ไปหน้า login
    router.push("/login");
  };

  return logoutAdmin;
};

export const loginAdminAction = async (prevState: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch('http://localhost:3000/api/auth/admin', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.error || "Login ไม่สำเร็จ" };
    }
    console.log(data)
    // เก็บ token และ role ใน localStorage
    console.log(typeof(window))
    if (typeof window !== "undefined") {
      localStorage.setItem("token", data.token);         // token
      localStorage.setItem("role", data.user.role);      // role
    }

    return { success: true, message: data.message };
    
  } catch (error) {
    console.error(error);
    return { success: false, message: "เกิดข้อผิดพลาดในการ login" };
  }
};
