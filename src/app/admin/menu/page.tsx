'use client'

import MenuTableCRUD from "@/components/common/admin/Table/MenuTableCRUD/MenuTableCRUD";



export default function Page() {
  return (
    <div className="container mx-auto p-6">
      {/* ตารางเมนู */}
      <div className="mb-2">
        <MenuTableCRUD />
      </div>
    </div>
  );
}
