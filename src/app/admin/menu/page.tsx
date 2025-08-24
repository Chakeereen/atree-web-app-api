'use client'
import { useState } from "react";
import MenuTableCRUD from "@/components/common/admin/table/tableCRUD/MenuTableCRUD";
import Modal from "@/components/common/Modal";
import CreateMenu from "./create/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      {/* ตารางเมนู */}
      <div className="mb-2">
        <MenuTableCRUD />
      </div>

      {/* ปุ่มเพิ่มเมนู */}
      <div className="flex justify-start mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          เพิ่มข้อมูล
        </button>
      </div>

      {/* Modal สำหรับสร้างเมนู */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-xl font-semibold mb-4">เพิ่มข้อมูลเมนู</h2>
        <p className="text-gray-600 mb-4">
          คุณสามารถสร้างเมนูใหม่ได้ที่นี่
        </p>

        {/* ส่ง onSuccess ให้ CreateMenu */}
        <CreateMenu
          onSuccess={() => {
            setIsModalOpen(false); // ปิด modal
            router.refresh();       // รีเฟรชหน้า → ตาราง menu อัปเดต
          }}
        />
      </Modal>
    </div>
  );
}
