'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import MenuActions from "./MenuActions";
import { deleteMenuAction, getMenuAll, updateMenuAvailability } from "../../../../../../action/MenuAction";
import { Menu } from "../../../../../../utils/type";
import Modal from "@/components/common/Modal";
import { EditMenu } from "./edit/EditMenu";
import CreateMenu from "@/app/admin/menu/create/page";
import ToggleSwitch from "../../switch/ToggleSwitch";

export default function MenuTableCRUD() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ฟังก์ชัน fetch menus
    const fetchMenus = async () => {
        setLoading(true);
        const result = await getMenuAll();
        if (result.success) {
            setMenus(result.data);
        } else {
            console.error(result.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // Delete
    const handleDelete = async (menuID: number, image?: string) => {
        const confirmed = confirm("Are you sure you want to delete this menu?");
        if (!confirmed) return;

        const result = await deleteMenuAction(menuID, image);
        alert(result.message);

        if (result.success) {
            fetchMenus(); // รีเฟรชเมนูใหม่
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-10">
                <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                <span className="ml-2">กำลังโหลด...</span>
            </div>
        );
    }

    return (
        <>
            {/* ตารางเมนู */}
            <Card className="shadow-lg rounded-2xl">
                <CardContent>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">📋 รายการเมนู</h2>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            เพิ่มข้อมูล
                        </button>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ภาพ</TableHead>
                                <TableHead>ชื่อเมนู</TableHead>
                                <TableHead>ราคา</TableHead>
                                <TableHead>สถานะ</TableHead>
                                <TableHead>ประเภท</TableHead>
                                <TableHead className="text-right">การจัดการ</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {menus.map((menu) => (
                                <TableRow key={menu.menuID}>
                                    <TableCell>
                                        <img
                                            src={menu.image}
                                            alt={menu.name}
                                            className="h-12 w-12 object-cover rounded-md"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{menu.name}</TableCell>
                                    <TableCell>{menu.price.toFixed(2)} ฿</TableCell>
                                    <TableCell>
                                        {/* Toggle Switch สำหรับเปลี่ยน isAvailable */}
                                        <ToggleSwitch
                                            isOn={menu.isAvailable}
                                            label={menu.isAvailable ? "พร้อมขาย" : "หมด"}
                                            onToggle={async (newState) => {
                                                const res = await updateMenuAvailability(menu.menuID, newState);
                                                if (res.success) {
                                                    setMenus((prev) =>
                                                        prev.map((m) =>
                                                            m.menuID === menu.menuID ? { ...m, isAvailable: newState } : m
                                                        )
                                                    );
                                                } else {
                                                    alert(res.message);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{menu.typeID}</TableCell>
                                    <TableCell className="text-right">
                                        <MenuActions
                                            menu={menu}
                                            onEdit={(menu) => setEditingMenu(menu)}
                                            onDelete={(id) => handleDelete(id, menu.fileID)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal สำหรับ Edit */}
            {editingMenu && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setEditingMenu(null);
                        fetchMenus(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <EditMenu
                        menu={editingMenu}
                        onSuccess={() => {
                            setEditingMenu(null);
                            fetchMenus(); // รีเฟรชเมนูหลังแก้ไขสำเร็จ
                        }}
                    />
                </Modal>
            )}

            {/* Modal สำหรับ Create */}
            {isCreateModalOpen && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        fetchMenus(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4">เพิ่มข้อมูลเมนู</h2>
                    <p className="text-gray-600 mb-4">
                        คุณสามารถสร้างเมนูใหม่ได้ที่นี่
                    </p>
                    <CreateMenu
                        onSuccess={() => {
                            setIsCreateModalOpen(false); // ปิด modal
                            fetchMenus();                // รีเฟรชเมนูใหม่
                        }}
                    />
                </Modal>
            )}
        </>
    );
}
