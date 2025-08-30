"use client"; // บังคับให้ component นี้เป็น client-side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuTable from "@/components/common/admin/Table/MenuTable";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // <-- เปลี่ยนจาก "accessToken" เป็น "token"
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
      console.log("มี token:", token);
      setLoading(false); // token มีและ role admin → render content
    } else {
      console.log("ยังไม่มี token หรือไม่ใช่ admin");
      router.push("/login"); // redirect login
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <MenuTable />
    </div>
  );
};

export default Page;
