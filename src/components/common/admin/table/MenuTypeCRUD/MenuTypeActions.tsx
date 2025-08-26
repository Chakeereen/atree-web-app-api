import React from "react";
import { MenuType } from "../../../../../../utils/type";

interface MenuActionsProps {
    menuType: MenuType; // ส่ง object menu ทั้งหมด
    onEdit: (menuType: MenuType) => void; // callback สำหรับ edit
    onDelete: (id: number) => void; // callback สำหรับ delete
}

export default function MenuTypeActions({ menuType, onEdit, onDelete }: MenuActionsProps) {
    return (
        <div className="flex justify-end space-x-2">
            <button
                onClick={() => onEdit(menuType)} // เปิด modal กับ menu นี้
                className="bg-yellow-500 px-2 py-1 rounded text-white"
            >
                แก้ไข
            </button>
            <button
                onClick={() => onDelete(menuType.typeID)}
                className="bg-red-500 px-2 py-1 rounded text-white"
            >
                ลบ
            </button>
        </div>
    );
}
