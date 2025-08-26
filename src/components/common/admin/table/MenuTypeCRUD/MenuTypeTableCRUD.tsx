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
import { Loader2 } from "lucide-react";

import { MenuType } from "../../../../../../utils/type";
import Modal from "@/components/common/Modal";
import { deleteMenuTypeAction, getMenuTypeAll } from "../../../../../../action/admin/MenuTypeAction";
import { EditType } from "./Edit/EditType";
import MenuTypeActions from "./MenuTypeActions";
import CreateMenuType from "@/app/admin/menu/menuType/create/page";

export default function MenuTypeTableCRUD() {
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState<MenuType | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // ฟังก์ชัน fetch menus
    const [categories, setCategories] = useState<MenuType[]>([]);

    const fetchCategories = async () => {
        setLoading(true);
        const result = await getMenuTypeAll(); // ฟังก์ชัน fetch categories
        if (result.success) {
            setCategories(result.data);
        } else {
            console.error(result.error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);


    // Delete
    const handleDeleteCategory = async (categoryId: number) => {
        const confirmed = confirm("คุณแน่ใจว่าต้องการลบประเภทนี้?");
        if (!confirmed) return;

        const result = await deleteMenuTypeAction(categoryId);
        alert(result.message);
        if (result.success) fetchCategories();
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
                                <TableHead>รหัสประเภท</TableHead>
                                <TableHead>ชื่อประเภท</TableHead>
                                <TableHead className="text-right">การจัดการ</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.typeID}>
                                    <TableCell>{category.typeID}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell className="text-right">
                                        <MenuTypeActions
                                            menuType={category}
                                            onEdit={(category) => setEditingCategory(category)}
                                            onDelete={(typeID) => handleDeleteCategory(typeID)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal สำหรับ Edit */}
            {editingCategory && (
                <Modal
                    isOpen={true}
                    onClose={() => {
                        setEditingCategory(null);
                        //fetchCategories(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <EditType
                        menuType={editingCategory}
                        onSuccess={() => {
                            setEditingCategory(null);
                            fetchCategories(); // รีเฟรชเมนูหลังแก้ไขสำเร็จ
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
                        //fetchCategories(); // รีเฟรชเมนูหลังปิด modal
                    }}
                >
                    <h2 className="text-xl font-semibold mb-4">เพิ่มข้อมูลเมนู</h2>
                    <p className="text-gray-600 mb-4">
                        คุณสามารถสร้างเมนูใหม่ได้ที่นี่
                    </p>
                    <CreateMenuType
                        onSuccess={() => {
                            setIsCreateModalOpen(false); // ปิด modal
                            fetchCategories();                // รีเฟรชเมนูใหม่
                        }}
                    />
                </Modal>
            )}
        </>
    );
}
